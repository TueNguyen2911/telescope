const { getRealWorldYouTubeFeedUri } = require('../fixtures');
const loadFeedsIntoQueue = require('../../src');
const feedWorker = require('../../src/feed/worker');
const { feedQueue } = require('../../src/feed/queue');
const getWikiFeeds = require('../../src/utils/wiki-feed-parser');

jest.mock('../../src/utils/wiki-feed-parser');

const valid_feeds = [
  {
    author: 'Tue Nguyen',
    url: 'https://dev.to/feed/tuenguyen2911_67',
  },
  {
    author: 'Antonio Bennett',
    url: 'https://dev.to/feed/antoniobennett',
  },
];
const invalid_feeds = [
  {
    author: 'Cesar Oliveira',
    url: 'http://tea.cesaroliveira.net/archives/tag/seneca/feed',
  },
  {
    author: 'Hesam Chobanlou',
    url: 'http://hesam-chobanlou.com/feed/atom.php',
  },
];

describe("Testing parser service's flow", () => {
  test('Posts service should return 2 valid feeds', () => {
    feedQueue.on('drained', () => console.log('done'));

    getWikiFeeds.mockReturnValue(valid_feeds);
    loadFeedsIntoQueue();
    feedWorker.start();
  });
});
