define(function()
{
    return {
        /* These are all constants used in the UMR javascript. */
        ZEEGUU_SERVER: 'https://www.zeeguu.unibe.ch/api',
        RECOMMENDED_FEED_ENDPOINT: '/interesting_feeds',
        FOLLOW_FEED_ENDPOINT: '/start_following_feed_with_id',
        UNFOLLOW_FEED_ENDPOINT: '/stop_following_feed',
        GET_TRANSLATIONS_ENDPOINT: '/get_possible_translations',
        GET_FEEDS_BEING_FOLLOWED: '/get_feeds_being_followed',
        GET_FEED_ITEMS: '/get_feed_items_with_metrics',
        GET_AVAILABLE_LANGUAGES: '/available_languages',
        TO_LANGUAGE: 'en',
        ARTICLE_FROM_URL: 'zeeguu-umr-core.herokuapp.com',
        HTML_ZEEGUUTAG: 'ZEEGUU',
        HTML_ATTRIBUTE_TRANSCOUNT: 'transCount',
        HTML_ATTRIBUTE_TRANSLATION: 'translation',
        HTML_ID_TOGGLETRANSLATE: '#toggle_translate',
        HTML_ID_ALTERMENU: '#alterMenu',
        HTML_ID_ALTERMENUCONTAINER: '#alterMenuContainer',
        HTML_ID_ARTICLELINK_TEMPLATE: '#articleLink-template',
        HTML_ID_ARTICLELINK_LIST: '#articleLinkList',
        HTML_ID_SUBSCRIPTION_TEMPLATE: '#subscription-template',
        HTML_ID_SUBSCRIPTION_LIST: "#subscriptionList",
        HTML_ID_ADDSUBSCRIPTION_TEMPLATE: '#feedAddable-template',
        HTML_ID_ADDSUBSCRIPTION_LIST: '#addableFeedList',
        HTML_ID_LANGUAGEOPTION_TEMPLATE: '#languageOption-template',
        HTML_CLASS_LOADER: '.loader'
    };
});