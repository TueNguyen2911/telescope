let feeds = [];

module.exports = {
  __setMockFeeds: (redisFeeds) => {
    const mockFeeds = redisFeeds.map((feed) => {
      return {
        id: feed.id,
        flagged: false,
      };
    });
    feeds = mockFeeds;
  },
  // Flagged feed related functions
  getAllFeeds: jest.fn().mockImplementation(() => Promise.resolve(feeds)),
  setFlaggedFeed: jest.fn().mockImplementation((id) => {
    feeds.forEach((feed) => {
      if (feed.id === id) {
        feed.flagged = true;
      }
    });
    return Promise.resolve();
  }),
  unsetFlaggedFeed: jest.fn().mockImplementation((id) => {
    feeds.forEach((feed) => {
      if (feed.id === id) {
        feed.flagged = false;
      }
    });
    return Promise.resolve();
  }),

  getFlaggedFeeds: jest.fn().mockImplementation(() => {
    const flaggedFeedIds = feeds.filter((feed) => feed.flagged).map((feed) => feed.id);
    return Promise.resolve(flaggedFeedIds);
  }),
  isFlagged: jest.fn().mockImplementation((id) => {
    const targetFeed = feeds.filter((feed) => feed.id === id)[0];

    return Promise.resolve(targetFeed.flagged);
  }),
};
