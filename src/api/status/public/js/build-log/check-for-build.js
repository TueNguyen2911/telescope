import checkBuildStatus from './check-build-status.js';
import terminal from './terminal.js';
import buildHeader from './build-header.js';
import showToast from '../utils/toast.js';
import { buildLogExistsInStorage } from '../utils/operations.js';

let build;
let uploaded = false; //true if the build log is uploaded to supabase storage

export default async function checkForBuild() {
  const status = await checkBuildStatus();
  console.log(status);
  // Prefer the current build, but fallback to the previous one
  const buildData = status.current ?? status.previous;

  if (build && build.sha === buildData.sha) {
    return;
  }
  if (!build.current && build.previous && !uploaded) {
    const exists = await buildLogExistsInStorage(build.sha);
    console.log(exists);
  }
  build = buildData;

  // Render the build header info
  buildHeader(build);

  if (!build) {
    showToast('Build information is missing.', 'warning');
    return;
  }

  const reader = await build.getReader();
  if (!reader) {
    showToast('Reader object from build cannot be retrieved.', 'danger');
    return;
  }

  const finish = async () => {
    try {
      await reader.cancel();
    } catch (err) {
      console.warn('Unable to clean up build log reader');
    }
  };

  const processLog = () => {
    reader
      .read()
      .then(({ done, value }) => {
        if (done) {
          return finish();
        }
        // Write the data to the terminal
        terminal.write(value);
        terminal.scrollToBottom();
        // Recursively invoke processLog until `done === true`
        return processLog();
      })
      .catch(finish);
  };

  // Start processing the log output messages
  terminal.clear();
  processLog();
}
