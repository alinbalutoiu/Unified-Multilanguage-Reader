import $ from 'jquery';
import Mustache from 'mustache';
import config from '../config';
import swal from 'sweetalert';
import UserActivityLogger from '../UserActivityLogger';
import ZeeguuRequests from '../zeeguuRequests';
import {GET_AVAILABLE_TOPICS} from '../zeeguuRequests';
import {take_keyboard_focus_away_from_article_list} from './main.js';


const HTML_ID_DIALOG_TEMPLATE = '#add-topic-dialog-template';
const HTML_ID_ADD_FEED_LIST = '#addableTopicList';
const HTML_ID_FEED_TEMPLATE = '#topicAddable-template';
const HTML_CLASS_SUBSCRIBE_BUTTON = ".subscribeButton";
const HTML_CLASS_FEED_ICON = '.feedIcon';
const USER_EVENT_OPENED_FEEDSUBSCRIBER = 'OPEN TOPICSUBSCRIBER';
let self;

/**
 * Allows the user to add topic subscriptions.
 */
export default class TopicSubscriber {
    /**
     * Link the {@link TopicSubscriptionList} with this instance so we can update it on change.
     * @param topicSubscriptionList
     * @param searchSubscriptionList
     */
    constructor(topicSubscriptionList, searchSubscriptionList) {
        this.topicSubscriptionList = topicSubscriptionList;
        this.searchSubscriptionList = searchSubscriptionList;
        self = this;
    }

    /**
     * Open the dialog window containing the list of topics.
     * Uses the sweetalert library.
     */
    open() {

        take_keyboard_focus_away_from_article_list();

        UserActivityLogger.log(USER_EVENT_OPENED_FEEDSUBSCRIBER);
        let template = $(HTML_ID_DIALOG_TEMPLATE).html();
        swal({
            title: 'Interesting',
            text: template,
            html: true,
            allowOutsideClick: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Close',
        });

        let addCustomTopic = document.querySelector('.addCustomTopic');
        $(addCustomTopic).click(function () {
            swal.close();
            setTimeout(function() {
                swal({
                    title: 'Create a custom topic!',
                    type: 'input',
                    inputPlaceholder: "Topic keywords",
                    allowOutsideClick: true,
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: 'Add own topic!',
                    cancelButtonText: 'Close',
                }, function(input) {
                    if (input === "" || input === false) {
                        return false
                    }
                    self.searchSubscriptionList.follow(input);
                })}, 150);
        });

        this.load();
    }

    /**
     * Call Zeeguu and requests available topics.
     */
    load() {
        ZeeguuRequests.get(GET_AVAILABLE_TOPICS, {}, this._loadFeedOptions.bind(this));
    }

    /**
     * Clear the list of feed options.
     */
    clear() {
        $(HTML_ID_ADD_FEED_LIST).empty();
    }

    /**
     * Fills the dialog's list with all the addable topics.
     * Callback function for zeeguu.
     * @param {Object[]} data - A list of topics the user can subscribe to.
     */
    _loadFeedOptions(data) {
        let template = $(HTML_ID_FEED_TEMPLATE).html();
        for (let i = 0; i < data.length; i++) {
            let feedOption = $(Mustache.render(template, data[i]));
            let subscribeButton = $(feedOption.find(HTML_CLASS_SUBSCRIBE_BUTTON));

            subscribeButton.click(
                function (data, feedOption, topicSubscriptionList) {
                    return function () {
                        topicSubscriptionList.follow(data);
                        $(feedOption).fadeOut();
                    };
                }(data[i], feedOption, this.topicSubscriptionList));

            let feedIcon = $(feedOption.find(HTML_CLASS_FEED_ICON));
            feedIcon.on("error", function () {
                $(this).unbind("error").attr("src", "static/images/noAvatar.png");
            });
            $(HTML_ID_ADD_FEED_LIST).append(feedOption);
        }
    }
};
