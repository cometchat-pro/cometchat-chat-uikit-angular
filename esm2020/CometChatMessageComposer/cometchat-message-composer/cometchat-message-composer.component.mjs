import { Component, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { MediaRecorderStyle, } from "@cometchat/uikit-elements";
import { localize, AuxiliaryButtonAlignment, Placement, CometChatMessageEvents, CometChatUIKitConstants, MessageStatus, fontHelper, CometChatUIEvents, States, UserMemberListType, } from "@cometchat/uikit-resources";
import { MessageComposerStyle, CometChatSoundManager, StickersConstants, CometChatUIKitUtility, CometChatMentionsFormatter, UserMentionStyle, } from "@cometchat/uikit-shared";
import { ChatConfigurator } from "../../Shared/Framework/ChatConfigurator";
import "@cometchat/uikit-shared";
import "@cometchat/uikit-elements";
import { CometChatException } from "../../Shared/Utils/ComeChatException";
import * as i0 from "@angular/core";
import * as i1 from "../../CometChatTheme.service";
import * as i2 from "../../CometChatUserMemberWrapper/cometchat-user-member-wrapper.component";
import * as i3 from "@angular/common";
/**
 *
 * CometChatMessageComposer is used to send message to user or group.
 *
 * @version 1.0.0
 * @author CometChatTeam
 * @copyright © 2022 CometChat Inc.
 *
 */
export class CometChatMessageComposerComponent {
    constructor(ref, themeService) {
        this.ref = ref;
        this.themeService = themeService;
        this.disableSoundForMessages = false;
        this.customSoundForMessage = "";
        this.disableTypingEvents = false;
        this.text = "";
        this.placeholderText = localize("ENTER_YOUR_MESSAGE_HERE");
        this.attachmentIconURL = "assets/Plus.svg";
        this.auxiliaryButtonsAlignment = AuxiliaryButtonAlignment.right;
        this.parentMessageId = 0;
        this.hideLiveReaction = true;
        this.LiveReactionIconURL = "assets/heart-reaction.png";
        this.backButtonIconURL = "assets/backbutton.svg";
        this.InfoSimpleIcon = "assets/InfoSimpleIcon.svg";
        this.messageComposerStyle = {
            height: "100%",
            width: "100%",
            borderRadius: "12px",
            maxInputHeight: "100px",
        };
        this.onError = (error) => {
            console.log(error);
        };
        this.backdropStyle = {
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
        };
        this.actionSheetStyle = {
            layoutModeIconTint: "rgba(20, 20, 20, 0.04)",
            borderRadius: "inherit",
            background: "rgb(255,255,255)",
            border: "none",
            width: "100%",
            height: "100%",
            titleFont: "500 15px Inter, sans-serif",
            titleColor: "#141414",
            listItemBackground: "",
            ActionSheetSeparatorTint: "1px solid RGBA(20, 20, 20, 0.08)",
        };
        this.aiActionSheetStyle = {
            layoutModeIconTint: "rgba(20, 20, 20, 0.04)",
            borderRadius: "inherit",
            background: "rgb(255,255,255)",
            border: "none",
            width: "100%",
            height: "100%",
            titleFont: "500 15px Inter, sans-serif",
            titleColor: "#141414",
            listItemBackground: "transparent",
            ActionSheetSeparatorTint: "1px solid RGBA(20, 20, 20, 0.08)",
        };
        this.hideVoiceRecording = false;
        this.mediaRecorderStyle = {};
        this.aiOptionsStyle = {};
        this.aiIconURL = "assets/ai-bot.svg";
        this.voiceRecordingIconURL = "assets/mic.svg";
        this.voiceRecordingCloseIconURL = "assets/close2x.svg";
        this.voiceRecordingStartIconURL = "assets/mic.svg";
        this.voiceRecordingStopIconURL = "assets/stop.svg";
        this.voiceRecordingSubmitIconURL = "assets/Send.svg";
        this.childEvent = new EventEmitter();
        this.textFormatters = [];
        this.mentionsFormatterInstanceId = "composer_" + Date.now();
        this.composerActions = [];
        this.states = States;
        this.mentionsSearchTerm = "";
        this.showListForMentions = false;
        this.mentionsSearchCount = 1;
        this.lastEmptySearchTerm = "";
        this.smartReplyState = States.loading;
        this.showMentionsCountWarning = false;
        this.loadingStateText = localize("GENERATING_REPLIES");
        this.errorStateText = localize("SOMETHING_WRONG");
        this.emptyStateText = localize("NO_MESSAGES_FOUND");
        this.showCreatePolls = false;
        this.showStickerKeyboard = false;
        this.showActionSheetItem = false;
        this.showActionSheetItemAI = false;
        this.showSmartReply = false;
        this.showAiFeatures = false;
        this.repliesArray = [];
        this.aiBotList = [];
        this.currentAskAIBot = "";
        this.isAiMoreThanOne = false;
        this.showPreview = false;
        this.aiFeaturesCloseCallback = null;
        this.textFormatterList = this.textFormatters
            ? [...this.textFormatters]
            : [];
        this.mentionedUsers = [];
        this.acceptHandlers = {
            "image/*": this.onImageChange.bind(this),
            "video/*": this.onVideoChange.bind(this),
            "audio/*": this.onAudioChange.bind(this),
            "file/*": this.onFileChange.bind(this),
        };
        this.enableStickerKeyboard = false;
        this.toggleMediaRecorded = false;
        this.showAiBotList = false;
        this.mentionsTypeSetByUser = false;
        this.stickerConfiguration = {};
        this.closeButtonIconURL = "assets/plus-rotated.svg";
        this.buttons = [];
        this.aiActionButtons = [];
        this.smartReplyStyle = {
            width: "100%",
            height: "fit-content",
            border: "none",
        };
        this.sendButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: "rgba(20, 20, 20, 0.58)",
            background: "transparent",
        };
        this.liveReactionStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: "red",
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
        this.localize = localize;
        this.emojiButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: "grey",
            background: "transparent",
        };
        this.stickerButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: "grey",
            background: "transparent",
        };
        this.mediaRecorderButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: "grey",
            background: "transparent",
        };
        this.emojiKeyboardStyle = {
            width: "100%",
            height: "100%",
            border: "none",
            textFont: this.messageComposerStyle?.emojiKeyboardTextFont,
            textColor: this.messageComposerStyle?.emojiKeyboardTextColor,
            background: this.themeService.theme.palette.getBackground(),
            borderRadius: "12px",
            activeIconTint: this.themeService.theme.palette.getPrimary(),
            iconTint: this.themeService.theme.palette.getAccent600()
        };
        this.stickerKeyboardStyle = {};
        this.textInputStyle = {};
        this.previewStyle = {
            height: "100%",
            width: "100%",
        };
        this.createPollStyle = {};
        this.emojiPopover = {
            width: "315px",
            height: "320px",
            border: "none",
            background: "transparent",
            borderRadius: "8px",
            boxShadow: "0px 0px 8px rgba(20, 20, 20, 0.2)",
        };
        this.stickerPopover = {
            width: "300px",
            height: "320px",
            border: "none",
            background: "transparent",
            borderRadius: "8px",
            boxShadow: "0px 0px 8px rgba(20, 20, 20, 0.2)",
        };
        this.aiPopover = {
            width: "280px",
            height: "280px",
            border: "none",
            background: "transparent",
            borderRadius: "8px",
            boxShadow: "0px 0px 8px rgba(20, 20, 20, 0.2)",
        };
        this.mediaRecordedPopover = {
            width: "250px",
            height: "100px",
            borderRadius: "8px",
            boxShadow: "0px 0px 8px rgba(20, 20, 20, 0.2)",
        };
        this.popoverStyle = {
            width: "275px",
            height: "280px",
            border: "none",
            background: "transparent",
            borderRadius: "8px",
            boxShadow: "0px 0px 8px rgba(20, 20, 20, 0.2)",
        };
        this.sendButtonIconURL = "assets/Send.svg";
        this.emojiButtonIconURL = "assets/Stipop.svg";
        this.stickerButtonIconURL = "assets/Stickers.svg";
        this.messageText = "";
        this.attachmentButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: "grey",
            background: "transparent",
        };
        this.auxilaryPlacement = Placement.top;
        this.messageSending = false;
        this.editPreviewText = "";
        this.showSendButton = false;
        this.showEmojiKeyboard = false;
        this.isAiEnabled = false;
        this.smartReplies = [];
        this.mentionStyleLocal = new UserMentionStyle({});
        this.sendMessageOnEnter = (event) => {
            this.showMentionsCountWarning = false;
            this.showListForMentions = false;
            this.sendTextMessage(event.detail.value);
            this.inputRef?.nativeElement?.emptyInputField();
            this.showSendButton = false;
            this.disableSendButton();
        };
        this.messageInputChanged = (event) => {
            const text = event?.detail?.value?.trim();
            this.sendButtonStyle = {
                height: "24px",
                width: "24px",
                border: "none",
                borderRadius: "0",
                buttonIconTint: text
                    ? this.messageComposerStyle?.sendIconTint
                    : this.themeService.theme.palette.getAccent200(),
                background: "transparent",
            };
            this.showSendButton = true;
            if (this.onTextChange) {
                this.onTextChange(text);
            }
            this.messageText = text;
            if (text) {
                this.startTyping();
            }
            else {
                this.endTyping();
            }
        };
        this.appendEmoji = (event) => {
            if (this.text === event?.detail.id) {
                this.text = "" + "";
                this.ref.detectChanges();
            }
            this.text = event?.detail.id;
            this.ref.detectChanges();
        };
        this.openCreatePolls = () => {
            this.showCreatePolls = true;
            if (this.showActionSheetItem) {
                this.actionSheetRef.nativeElement.click();
                this.showActionSheetItem = !this.showActionSheetItem;
            }
            this.ref.detectChanges();
        };
        this.closeCreatePolls = () => {
            this.showCreatePolls = false;
            this.ref.detectChanges();
        };
        this.sendRecordedMedia = (event) => {
            let file = event?.detail?.file;
            if (file) {
                this.sendRecordedAudio(file);
            }
            this.closeMediaRecorder();
            this.ref.detectChanges();
        };
        this.sendRecordedAudio = (file) => {
            try {
                const uploadedFile = file;
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    const newFile = new File([reader.result], `audio-recording-${this.getFormattedDate()}.wav`, uploadedFile);
                    this.sendMediaMessage(newFile, CometChatUIKitConstants.MessageTypes.audio);
                }, false);
                reader.readAsArrayBuffer(uploadedFile);
            }
            catch (error) {
                if (this.onError) {
                    this.onError(CometChatException(error));
                }
            }
            return true;
        };
        this.handleActions = (event) => {
            let action = event?.detail?.action;
            this.showAiFeatures = false;
            if (action.onClick) {
                action.onClick();
            }
        };
        this.inputChangeHandler = (event) => {
            const handler = this.acceptHandlers[this.inputElementRef.nativeElement.accept] ||
                this.onFileChange.bind(this);
            handler(event);
        };
        this.sendSticker = (event) => {
            this.stickerButtonRef?.nativeElement?.click();
            this.showStickerKeyboard = false;
            let sticker = event?.detail?.stickerURL;
            let stickerName = event?.detail?.stickerName;
            if (this.stickerConfiguration?.configuration?.ccStickerClicked) {
                this.stickerConfiguration?.configuration?.ccStickerClicked({
                    name: stickerName,
                    url: sticker,
                }, this.loggedInUser, this.user, this.group, this.parentMessageId, this.onError, this.customSoundForMessage, this.disableSoundForMessages);
            }
        };
        this.openImagePicker = () => {
            this.inputElementRef.nativeElement.type = "file";
            this.inputElementRef.nativeElement.accept = "image/*";
            this.inputElementRef.nativeElement.click();
            this.closePopovers();
        };
        this.openFilePicker = () => {
            this.inputElementRef.nativeElement.type = "file";
            this.inputElementRef.nativeElement.accept = "file/*";
            this.inputElementRef.nativeElement.click();
            this.closePopovers();
        };
        this.openvideoPicker = () => {
            this.inputElementRef.nativeElement.type = "file";
            this.inputElementRef.nativeElement.accept = "video/*";
            this.inputElementRef.nativeElement.click();
            this.closePopovers();
        };
        this.openAudioPicker = () => {
            this.inputElementRef.nativeElement.type = "file";
            this.inputElementRef.nativeElement.accept = "audio/*";
            this.inputElementRef.nativeElement.click();
            this.closePopovers();
        };
        this.openActionSheet = (event) => {
            if (event?.detail?.hasOwnProperty("isOpen")) {
                this.showActionSheetItem = false;
                this.ref.detectChanges();
                return;
            }
            this.showActionSheetItem = !this.showActionSheetItem;
            this.closeMediaRecorder();
            if (this.showEmojiKeyboard) {
                this.emojiButtonRef.nativeElement.click();
                this.showEmojiKeyboard = !this.showEmojiKeyboard;
            }
            if (this.showStickerKeyboard) {
                this.stickerButtonRef.nativeElement.click();
                this.showStickerKeyboard = !this.showStickerKeyboard;
                this.ref.detectChanges();
            }
            if (this.showAiFeatures) {
                this.aiButtonRef.nativeElement.click();
                this.showAiFeatures = !this.showAiFeatures;
                this.ref.detectChanges();
            }
            else {
                return;
            }
        };
        this.handleAiFeaturesClose = (callback) => {
            this.aiFeaturesCloseCallback = callback;
        };
        this.closeSmartReply = () => {
            this.showAiFeatures = false;
            this.ref.detectChanges();
            return;
        };
        this.openAiFeatures = (event) => {
            if (this.aiFeaturesCloseCallback) {
                this.aiFeaturesCloseCallback();
            }
            if (event?.detail?.hasOwnProperty("isOpen")) {
                this.showAiFeatures = false;
                this.ref.detectChanges();
                return;
            }
            this.showAiFeatures = !this.showAiFeatures;
            this.closeMediaRecorder();
            if (this.showEmojiKeyboard) {
                this.emojiButtonRef.nativeElement.click();
                this.showEmojiKeyboard = !this.showEmojiKeyboard;
            }
            if (this.showStickerKeyboard) {
                this.stickerButtonRef.nativeElement.click();
                this.showStickerKeyboard = !this.showStickerKeyboard;
                this.ref.detectChanges();
            }
            if (this.showActionSheetItem) {
                this.actionSheetRef.nativeElement.click();
                this.showActionSheetItem = !this.showActionSheetItem;
                this.ref.detectChanges();
            }
            else {
                this.showActionSheetItemAI = true;
                return;
            }
        };
        this.openEmojiKeyboard = (event) => {
            if (event?.detail?.hasOwnProperty("isOpen")) {
                this.showEmojiKeyboard = false;
                this.ref.detectChanges();
                return;
            }
            this.showEmojiKeyboard = !this.showEmojiKeyboard;
            this.closeMediaRecorder();
            if (this.showActionSheetItem) {
                this.actionSheetRef.nativeElement.click();
                this.showActionSheetItem = !this.showActionSheetItem;
                this.ref.detectChanges();
            }
            if (this.showStickerKeyboard) {
                this.stickerButtonRef.nativeElement.click();
                this.showStickerKeyboard = !this.showStickerKeyboard;
                this.ref.detectChanges();
            }
            if (this.showAiFeatures) {
                this.aiButtonRef.nativeElement.click();
                this.showAiFeatures = !this.showAiFeatures;
                this.ref.detectChanges();
            }
            else {
                return;
            }
        };
        this.openMediaRecorded = (event) => {
            if (event?.detail?.hasOwnProperty("isOpen")) {
                this.toggleMediaRecorded = false;
                this.ref.detectChanges();
                return;
            }
            this.toggleMediaRecorded = !this.toggleMediaRecorded;
            this.ref.detectChanges();
            if (this.showActionSheetItem) {
                this.actionSheetRef.nativeElement.click();
                this.showActionSheetItem = !this.showActionSheetItem;
                this.ref.detectChanges();
            }
            if (this.showEmojiKeyboard) {
                this.emojiButtonRef.nativeElement.click();
                this.showEmojiKeyboard = !this.showEmojiKeyboard;
                this.ref.detectChanges();
            }
            if (this.showStickerKeyboard) {
                this.stickerButtonRef.nativeElement.click();
                this.showStickerKeyboard = !this.showStickerKeyboard;
                this.ref.detectChanges();
            }
            if (this.showAiFeatures) {
                this.aiButtonRef.nativeElement.click();
                this.showAiFeatures = !this.showAiFeatures;
                this.ref.detectChanges();
            }
            else {
                return;
            }
        };
        this.openStickerKeyboard = (event) => {
            if (event?.detail?.hasOwnProperty("isOpen")) {
                this.showStickerKeyboard = false;
                this.ref.detectChanges();
                return;
            }
            this.showStickerKeyboard = !this.showStickerKeyboard;
            this.closeMediaRecorder();
            this.ref.detectChanges();
            if (this.showActionSheetItem) {
                this.actionSheetRef.nativeElement.click();
                this.showActionSheetItem = !this.showActionSheetItem;
                this.ref.detectChanges();
            }
            if (this.showEmojiKeyboard) {
                this.emojiButtonRef.nativeElement.click();
                this.showEmojiKeyboard = !this.showEmojiKeyboard;
                this.ref.detectChanges();
            }
            else {
                return;
            }
        };
        /**
         * Check for developer provided instance of MentionsTextFormatter
         * If not provided, add default
         * If provided, check if style is provided via configuration, then add style.
         */
        this.initializeMentionsFormatter = () => {
            if (!this.disableMentions) {
                this.mentionsTextFormatterInstance.setMentionsTextStyle(this.getMentionsStyle());
                let foundMentionsFormatter;
                if (this.textFormatters.length) {
                    for (let i = 0; i < this.textFormatterList.length; i++) {
                        if (this.textFormatterList[i] instanceof CometChatMentionsFormatter) {
                            foundMentionsFormatter = this.textFormatterList[i];
                            this.mentionsTextFormatterInstance = foundMentionsFormatter;
                            break;
                        }
                    }
                }
                if (foundMentionsFormatter) {
                    this.mentionsTextFormatterInstance = foundMentionsFormatter;
                }
                if (!this.mentionsTextFormatterInstance.getKeyUpCallBack() ||
                    this.mentionsTextFormatterInstance.getKeyDownCallBack()) {
                    this.mentionsTextFormatterInstance.setKeyUpCallBack(this.searchMentions);
                    this.mentionsTextFormatterInstance.setKeyDownCallBack(this.searchMentions);
                    this.mentionsTextFormatterInstance.setId(this.mentionsFormatterInstanceId);
                }
                if (!foundMentionsFormatter) {
                    this.textFormatterList.push(this.mentionsTextFormatterInstance);
                }
            }
        };
        this.getMentionsStyle = () => {
            return this.mentionStyleLocal;
        };
        this.getSmartReplies = () => {
            this.showSmartReply = true;
            this.repliesArray = [];
            this.showActionSheetItemAI = false;
            this.showAiBotList = false;
            this.smartReplyState = States.loading;
            this.ref.detectChanges();
            return new Promise((resolve, reject) => {
                let receiverId = this.user
                    ? this.user?.getUid()
                    : this.group?.getGuid();
                let receiverType = this.user
                    ? CometChatUIKitConstants.MessageReceiverType.user
                    : CometChatUIKitConstants.MessageReceiverType.group;
                CometChat.getSmartReplies(receiverId, receiverType)
                    .then((response) => {
                    let repliesArray = [];
                    Object.keys(response).forEach((reply) => {
                        if (response[reply] && response[reply] != "") {
                            this.repliesArray.push(response[reply]);
                            repliesArray.push(response[reply]);
                        }
                    });
                    resolve(repliesArray);
                    this.smartReplyState = States.loaded;
                    this.ref.detectChanges();
                })
                    .catch((err) => {
                    this.smartReplyState = States.error;
                    this.ref.detectChanges();
                    return reject(err);
                });
            });
        };
        this.showAiBotMessageListMethod = (action) => {
            this.aiBotList = action;
            this.showActionSheetItemAI = false;
            this.showAiBotList = true;
            this.aiActionButtons.length = 0;
            this.aiBotList.forEach((e, i) => {
                const newButton = {
                    id: e.id,
                    title: e.title,
                    onClick: async () => {
                        CometChatUIEvents.ccShowPanel.next({
                            child: { bot: e, showBotView: true },
                        });
                    },
                };
                this.aiActionButtons.push(newButton);
            });
            this.ref.detectChanges();
        };
        this.sendReply = (event) => {
            let reply = event?.detail?.reply;
            CometChatUIEvents.ccComposeMessage.next(reply);
            this.repliesArray = [];
            this.showActionSheetItemAI = false;
            this.showAiFeatures = false;
            this.aiButtonRef.nativeElement.click();
            this.ref.detectChanges();
        };
        this.backButtonStyle = () => {
            return {
                height: "24px",
                width: "24px",
                border: "none",
                borderRadius: "0",
                background: "transparent",
                buttonIconTint: this.themeService.theme.palette.getPrimary(),
            };
        };
        /**
         * Accepts search term from mentionsTextFormatter and opens the mentions select list
         *
         * @param {string} searchTerm
         * @returns {void}
         */
        this.searchMentions = (searchTerm) => {
            if (!(searchTerm && searchTerm.length)) {
                this.mentionsSearchTerm = "";
                this.showListForMentions = false;
                this.mentionsSearchCount = 1;
                this.ref.detectChanges();
                return;
            }
            if (!this.lastEmptySearchTerm ||
                !searchTerm
                    .split("@")[1]
                    .toLowerCase()
                    .startsWith(this.lastEmptySearchTerm.toLowerCase())) {
                this.mentionsSearchTerm =
                    searchTerm.split("@")[1] && searchTerm.split("@")[1].length
                        ? searchTerm.split("@")[1]
                        : "";
                this.showListForMentions = true;
                this.mentionsSearchCount++;
                this.lastEmptySearchTerm = undefined;
                this.ref.detectChanges();
            }
        };
        /**
         * Called when clicking a user from the mentions list.
         * Add the user to mentions text formatter instance and then call rerender to style the mention
         * within message input.
         *
         * @param {CometChat.User} user
         */
        this.defaultMentionsItemClickHandler = (user) => {
            let cometChatUsers = [user];
            this.mentionsTextFormatterInstance.setCometChatUserGroupMembers(cometChatUsers);
            this.mentionsTextFormatterInstance.setLoggedInUser(this.loggedInUser);
            this.mentionedUsers = [
                ...this.mentionsTextFormatterInstance.getCometChatUserGroupMembers(),
            ];
            this.mentionsTextFormatterInstance.reRender();
            this.showListForMentions = false;
            this.mentionsSearchTerm = "";
            this.ref.detectChanges();
        };
        /**
         * Close mentions list if search returns empty list
         */
        this.defaultOnEmptyForMentions = () => {
            this.lastEmptySearchTerm = this.mentionsSearchTerm;
            this.showListForMentions = false;
            this.mentionsSearchTerm = "";
            this.ref.detectChanges();
        };
        this.getMentionInfoIconStyle = () => {
            return {
                height: "fit-content",
                width: "fit-content",
                buttonTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
                buttonTextColor: this.themeService.theme.palette.getAccent600(),
                borderRadius: "8px",
                border: "none",
                buttonIconTint: this.themeService.theme.palette.getAccent600(),
                padding: "8px",
                iconHeight: "20px",
                iconWidth: "20px",
                iconBackground: "transparent",
                gap: "5px",
            };
        };
        this.handleClickOutside = (event) => {
            if (this.userMemberWrapperRef) {
                const userMemberWrapperRect = this.userMemberWrapperRef?.nativeElement?.getBoundingClientRect();
                const isOutsideClick = event?.clientX <= userMemberWrapperRect?.left ||
                    event?.clientX >= userMemberWrapperRect?.right ||
                    event?.clientY >= userMemberWrapperRect?.top ||
                    event?.clientY <= userMemberWrapperRect?.bottom;
                if (isOutsideClick) {
                    this.showListForMentions = false;
                    this.mentionsSearchTerm = "";
                    this.ref.detectChanges();
                }
            }
        };
    }
    disableSendButton() {
        this.sendButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: this.themeService.theme.palette.getAccent200(),
            background: "transparent",
        };
        this.ref.detectChanges();
    }
    sendReaction() {
        let receiverId = this.user
            ? this.user?.getUid()
            : this.group?.getGuid();
        let receiverType = this.user
            ? CometChatUIKitConstants.MessageReceiverType.user
            : CometChatUIKitConstants.MessageReceiverType.group;
        let data = {
            type: "live_reaction",
            reaction: "heart",
        };
        let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data);
        CometChat.sendTransientMessage(transientMessage);
        CometChatMessageEvents.ccLiveReaction.next("heart");
        return;
    }
    closeMediaRecorder(event) {
        if (this.toggleMediaRecorded) {
            this.mediaRecordedRef.nativeElement.click();
            this.toggleMediaRecorded = !this.toggleMediaRecorded;
            this.ref.detectChanges();
        }
    }
    getFormattedDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = this.padZero(currentDate.getMonth() + 1);
        const day = this.padZero(currentDate.getDate());
        const hours = this.padZero(currentDate.getHours());
        const minutes = this.padZero(currentDate.getMinutes());
        const seconds = this.padZero(currentDate.getSeconds());
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    padZero(num) {
        return num.toString().padStart(2, "0");
    }
    addAttachmentCallback() {
        this.composerActions?.forEach((element) => {
            switch (element.id) {
                case CometChatUIKitConstants.MessageTypes.audio:
                    element.onClick = this.openAudioPicker;
                    break;
                case CometChatUIKitConstants.MessageTypes.video:
                    element.onClick = this.openvideoPicker;
                    break;
                case CometChatUIKitConstants.MessageTypes.file:
                    element.onClick = this.openFilePicker;
                    break;
                case CometChatUIKitConstants.MessageTypes.image:
                    element.onClick = this.openImagePicker;
                    break;
                case "extension_poll":
                    element.onClick = this.openCreatePolls;
                    break;
            }
        });
    }
    subscribeToEvents() {
        this.ccMessageEdit = CometChatMessageEvents.ccMessageEdited.subscribe((object) => {
            let parentId = object?.message?.getParentMessageId();
            if ((this.parentMessageId && parentId && parentId == this.parentMessageId) || (!this.parentMessageId && !parentId)) {
                if (object?.status == MessageStatus.inprogress) {
                    this.messageToBeEdited = object.message;
                    this.openEditPreview();
                }
            }
        });
        this.ccComposeMessage = CometChatUIEvents.ccComposeMessage.subscribe((text) => {
            this.text = text;
            this.ref.detectChanges();
        });
        this.ccShowMentionsCountWarning =
            CometChatUIEvents.ccShowMentionsCountWarning.subscribe((data) => {
                if (data.id == this.mentionsFormatterInstanceId) {
                    if (data.showWarning) {
                        this.showMentionsCountWarning = true;
                        return;
                    }
                    this.showMentionsCountWarning = false;
                }
            });
    }
    openEditPreview() {
        let messageTextWithMentionTags = this.checkForMentions(this.messageToBeEdited);
        this.text = "";
        this.inputRef?.nativeElement?.emptyInputField();
        this.text = this.messageToBeEdited.getText();
        this.editPreviewText = messageTextWithMentionTags;
        this.showPreview = true;
        this.ref.detectChanges();
    }
    /**
     * Adds @ for every mention the message by matching uid
     *
     * @param {string} message
     * @returns  {void}
     */
    checkForMentions(message) {
        const regex = /<@uid:(.*?)>/g;
        let messageText = message.getText();
        let messageTextTmp = messageText;
        let match = regex.exec(messageText);
        let mentionedUsers = message.getMentionedUsers();
        let cometChatUsersGroupMembers = [];
        while (match !== null) {
            let user;
            for (let i = 0; i < mentionedUsers.length; i++) {
                if (match[1] == mentionedUsers[i].getUid()) {
                    user = mentionedUsers[i];
                }
            }
            if (user) {
                messageTextTmp = messageTextTmp.replace(match[0], "@" + user.getName());
                cometChatUsersGroupMembers.push(user);
            }
            match = regex.exec(messageText);
        }
        this.mentionsTextFormatterInstance.setCometChatUserGroupMembers(cometChatUsersGroupMembers);
        this.mentionsTextFormatterInstance.setLoggedInUser(this.loggedInUser);
        return messageTextTmp;
    }
    unsubscribeToEvents() {
        this.ccMessageEdit?.unsubscribe();
        this.ccShowMentionsCountWarning?.unsubscribe();
    }
    closeModals() {
        if (this.showActionSheetItem) {
            this.actionSheetRef?.nativeElement?.click();
            this.showActionSheetItem = false;
        }
        if (this.showEmojiKeyboard) {
            this.emojiButtonRef?.nativeElement?.click();
            this.showEmojiKeyboard = false;
        }
        if (this.showStickerKeyboard) {
            this.stickerButtonRef?.nativeElement?.click();
            this.showStickerKeyboard = false;
        }
        if (this.toggleMediaRecorded) {
            this.mediaRecordedRef?.nativeElement?.click();
            this.toggleMediaRecorded = false;
        }
        if (this.showAiFeatures) {
            this.aiButtonRef?.nativeElement?.click();
            this.showAiFeatures = false;
            this.showAiBotList = false;
        }
    }
    callConversationSummaryMethod() {
        this.showAiFeatures = false;
        this.aiButtonRef.nativeElement.click();
        CometChatUIEvents.ccShowPanel.next({
            child: { showConversationSummaryView: true },
        });
    }
    ngOnChanges(changes) {
        if (changes["user"] || changes["group"]) {
            this.userOrGroupChanged(changes);
        }
    }
    userOrGroupChanged(changes) {
        if (!this.disableMentions) {
            this.showListForMentions = false;
            if (changes["group"] && this.group) {
                if (this.userMemberWrapperConfiguration.userMemberListType == undefined) {
                    this.userMemberListType = UserMemberListType.groupmembers;
                }
                this.groupMembersRequestBuilder = this.userMemberWrapperConfiguration
                    .groupMemberRequestBuilder
                    ? this.userMemberWrapperConfiguration.groupMemberRequestBuilder
                    : new CometChat.GroupMembersRequestBuilder(this.group.getGuid()).setLimit(15);
            }
            if (changes["user"] && this.user) {
                if (this.userMemberWrapperConfiguration.userMemberListType == undefined) {
                    this.userMemberListType = UserMemberListType.users;
                }
                this.usersRequestBuilder = this.userMemberWrapperConfiguration
                    .usersRequestBuilder
                    ? this.userMemberWrapperConfiguration.usersRequestBuilder
                    : new CometChat.UsersRequestBuilder().setLimit(15);
            }
        }
        this.showAiBotList = false;
        this.showSmartReply = false;
        this.closeModals();
        this.messageText = "";
        this.inputRef?.nativeElement?.emptyInputField();
        this.showSendButton = false;
        this.text = "";
        this.composerId = this.getComposerId();
        if (this.attachmentOptions) {
            this.composerActions = this.attachmentOptions(this.user || this.group, this.composerId);
        }
        else {
            this.composerActions =
                ChatConfigurator.getDataSource()?.getAttachmentOptions(this.themeService.theme, this.user, this.group, this.composerId);
            this.addAttachmentCallback();
        }
        for (let i = 0; i < this.textFormatterList.length; i++) {
            this.textFormatterList[i].setComposerConfig(this.user, this.group, this.composerId);
        }
    }
    ngOnDestroy() {
        this.unsubscribeToEvents();
        this.mentionsTextFormatterInstance.cleanup();
    }
    customSendMethod(message) {
        this.showSendButton = false;
        this.sendTextMessage(message);
        this.disableSendButton();
        this.ref.detectChanges();
    }
    /**
     * @param  {String=""} textMsg
     */
    sendTextMessage(textMsg = "") {
        this.endTyping();
        try {
            // Dont Send Blank text messages -- i.e --- messages that only contain spaces
            if (this.messageText?.trim()?.length == 0 &&
                textMsg?.trim()?.length == 0) {
                return false;
            }
            // wait for the previous message to be sent before sending the current message
            if (this.messageSending) {
                return false;
            }
            this.messageSending = true;
            // If its an Edit and Send Message Operation , use Edit Message Function
            if (this.messageToBeEdited) {
                this.editMessage();
                this.ref.detectChanges();
                return false;
            }
            let { receiverId, receiverType } = this.getReceiverDetails();
            let messageInput;
            if (textMsg !== null) {
                messageInput = textMsg.trim();
            }
            else {
                messageInput = this.messageText.trim();
            }
            let textMessage = new CometChat.TextMessage(receiverId, messageInput, receiverType);
            if (this.parentMessageId) {
                textMessage.setParentMessageId(this.parentMessageId);
            }
            if (this.mentionedUsers.length) {
                let userObjects = [];
                for (let i = 0; i < this.mentionedUsers.length; i++) {
                    userObjects.push(this.mentionedUsers[i] instanceof CometChat.GroupMember
                        ? this.mentionedUsers[i]
                        : this.mentionedUsers[i]);
                }
                textMessage.setMentionedUsers(userObjects);
                this.mentionedUsers = [];
            }
            textMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
            textMessage.setMuid(CometChatUIKitUtility.ID());
            this.showMentionsCountWarning = false;
            // play audio after action generation
            if (!this.disableSoundForMessages) {
                this.playAudio();
            }
            //clearing Message Input Box
            this.messageText = "";
            this.inputRef?.nativeElement?.emptyInputField();
            this.text = "";
            this.messageSending = false;
            for (let i = 0; i < this.textFormatterList.length; i++) {
                textMessage = this.textFormatterList[i].formatMessageForSending(textMessage);
            }
            // End Typing Indicator Function
            this.closePopovers();
            if (!this.onSendButtonClick) {
                CometChatMessageEvents.ccMessageSent.next({
                    message: textMessage,
                    status: MessageStatus.inprogress,
                });
                CometChat.sendMessage(textMessage)
                    .then((message) => {
                    let messageObject = message;
                    CometChatMessageEvents.ccMessageSent.next({
                        message: messageObject,
                        status: MessageStatus.success,
                    });
                    // Change the send button to reaction button
                    setTimeout(() => {
                        this.showSendButton = false;
                        this.ref.detectChanges();
                    }, 500);
                    this.mentionsTextFormatterInstance.resetCometChatUserGroupMembers();
                })
                    .catch((error) => {
                    textMessage.setMetadata({
                        error: true,
                    });
                    CometChatMessageEvents.ccMessageSent.next({
                        message: textMessage,
                        status: MessageStatus.error,
                    });
                });
            }
            else {
                this.onSendButtonClick(textMessage);
            }
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
        return true;
    }
    onAiBackButtonClick() {
        this.showActionSheetItemAI = true;
        this.ref.detectChanges();
    }
    editMessage() {
        try {
            const messageToBeEdited = this.messageToBeEdited;
            let { receiverId, receiverType } = this.getReceiverDetails();
            let messageText = this.messageText.trim();
            let mentionedUsers = [];
            if (messageToBeEdited.getMentionedUsers()) {
                mentionedUsers = messageToBeEdited.getMentionedUsers();
                messageText =
                    this.mentionsTextFormatterInstance.getOriginalText(messageText);
                this.mentionsTextFormatterInstance.setCometChatUserGroupMembers(mentionedUsers);
                messageText =
                    this.mentionsTextFormatterInstance.getOriginalText(messageText);
            }
            let textMessage = new CometChat.TextMessage(receiverId, messageText, receiverType);
            if (mentionedUsers.length) {
                textMessage.setMentionedUsers(mentionedUsers);
            }
            textMessage.setId(messageToBeEdited.id);
            this.closePreview();
            this.endTyping();
            this.inputRef?.nativeElement?.emptyInputField();
            this.showMentionsCountWarning = false;
            this.messageToBeEdited = null;
            for (let i = 0; i < this.textFormatterList.length; i++) {
                textMessage = this.textFormatterList[i].formatMessageForSending(textMessage);
            }
            CometChat.editMessage(textMessage)
                .then((message) => {
                this.messageSending = false;
                CometChatMessageEvents.ccMessageEdited.next({
                    message: message,
                    status: MessageStatus.success,
                });
                this.mentionsTextFormatterInstance.resetCometChatUserGroupMembers();
            })
                .catch((error) => {
                this.messageSending = false;
                if (this.onError) {
                    this.onError(error);
                }
            });
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
    }
    getReceiverDetails() {
        let receiverId;
        let receiverType;
        if (this.user && this.user.getUid()) {
            receiverId = this.user.getUid();
            receiverType = CometChatUIKitConstants.MessageReceiverType.user;
        }
        else if (this.group && this.group.getGuid()) {
            receiverId = this.group.getGuid();
            receiverType = CometChatUIKitConstants.MessageReceiverType.group;
        }
        return { receiverId: receiverId, receiverType: receiverType };
    }
    playAudio() {
        if (this.customSoundForMessage) {
            CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage, this.customSoundForMessage);
        }
        else {
            CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);
        }
    }
    /**
     * @param  {} timer=null
     * @param  {string=""} metadata
     */
    startTyping(timer = null, metadata = "") {
        if (!this.disableTypingEvents) {
            try {
                let typingInterval = timer || 5000;
                let { receiverId, receiverType } = this.getReceiverDetails();
                let typingMetadata = metadata || undefined;
                let typingNotification = new CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
                CometChat.startTyping(typingNotification);
                this.storeTypingInterval = setTimeout(() => {
                    this.endTyping();
                }, typingInterval);
            }
            catch (error) {
                if (this.onError) {
                    this.onError(CometChatException(error));
                }
            }
        }
    }
    endTyping(metadata = null) {
        if (!this.disableTypingEvents) {
            try {
                let { receiverId, receiverType } = this.getReceiverDetails();
                let typingMetadata = metadata || undefined;
                let typingNotification = new CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
                CometChat.endTyping(typingNotification);
                clearTimeout(this.storeTypingInterval);
                this.storeTypingInterval = null;
            }
            catch (error) {
                if (this.onError) {
                    this.onError(CometChatException(error));
                }
            }
        }
    }
    /**
     * @param  {File | CometChat.MediaMessage} messageInput
     * @param  {string} messageType
     */
    sendMediaMessage(messageInput, messageType) {
        try {
            if (this.messageSending) {
                return false;
            }
            this.messageSending = true;
            const { receiverId, receiverType } = this.getReceiverDetails();
            let mediaMessage = new CometChat.MediaMessage(receiverId, messageInput, messageType, receiverType);
            if (this.parentMessageId) {
                mediaMessage.setParentMessageId(this.parentMessageId);
            }
            mediaMessage.setType(messageType);
            mediaMessage.setMetadata({
                ["file"]: messageInput,
            });
            mediaMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
            mediaMessage.setMuid(CometChatUIKitUtility.ID());
            if (!this.disableSoundForMessages) {
                this.playAudio();
            }
            this.messageSending = false;
            this.closePopovers();
            if (!this.onSendButtonClick) {
                CometChatMessageEvents.ccMessageSent.next({
                    message: mediaMessage,
                    status: MessageStatus.inprogress,
                });
                CometChat.sendMessage(mediaMessage)
                    .then((response) => {
                    this.messageSending = false;
                    response.setMuid(mediaMessage.getMuid());
                    CometChatMessageEvents.ccMessageSent.next({
                        message: response,
                        status: MessageStatus.success,
                    });
                })
                    .catch((error) => {
                    mediaMessage.setMetadata({
                        error: true,
                    });
                    CometChatMessageEvents.ccMessageSent.next({
                        message: mediaMessage,
                        status: MessageStatus.error,
                    });
                    this.messageSending = false;
                });
            }
            else {
                this.onSendButtonClick(mediaMessage);
            }
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
        return true;
    }
    /**
     * @param  {any} event
     */
    onVideoChange(event) {
        try {
            if (!event.target.files[0]) {
                return false;
            }
            const uploadedFile = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChatUIKitConstants.MessageTypes.video);
            }, false);
            reader.readAsArrayBuffer(uploadedFile);
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
        return true;
    }
    /**
     * @param  {any} event
     */
    onAudioChange(event) {
        try {
            if (!event.target.files[0]) {
                return false;
            }
            const uploadedFile = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChatUIKitConstants.MessageTypes.audio);
            }, false);
            reader.readAsArrayBuffer(uploadedFile);
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
        return true;
    }
    /**
     * @param  {any} event
     */
    onImageChange(event) {
        try {
            if (!event.target.files[0]) {
                return false;
            }
            const uploadedFile = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChatUIKitConstants.MessageTypes.image);
            }, false);
            reader.readAsArrayBuffer(uploadedFile);
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
        return true;
    }
    /**
     * @param  {any} event
     */
    onFileChange(event) {
        try {
            if (!event.target.files["0"]) {
                return false;
            }
            const uploadedFile = event.target.files["0"];
            var reader = new FileReader();
            reader.addEventListener("load", () => {
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChatUIKitConstants.MessageTypes.file);
            }, false);
            reader.readAsArrayBuffer(uploadedFile);
        }
        catch (error) {
            if (this.onError) {
                this.onError(CometChatException(error));
            }
        }
        return true;
    }
    closePopovers() {
        if (this.showEmojiKeyboard) {
            this.emojiButtonRef.nativeElement.click();
            this.showEmojiKeyboard = !this.showEmojiKeyboard;
        }
        if (this.showActionSheetItem) {
            this.actionSheetRef.nativeElement.click();
            this.showActionSheetItem = !this.showActionSheetItem;
        }
    }
    getComposerId() {
        const user = this.user;
        if (user !== undefined) {
            return {
                user: user?.getUid(),
                group: null,
                parentMessageId: this.parentMessageId,
            };
        }
        const group = this.group;
        if (group !== undefined) {
            return {
                user: null,
                group: group?.getGuid(),
                parentMessageId: this.parentMessageId,
            };
        }
        return { user: null, group: null, parentMessageId: this.parentMessageId };
    }
    ngOnInit() {
        this.setTheme();
        this.textFormatterList = this.textFormatters
            ? this.textFormatters
            : [];
        document.addEventListener("click", this.handleClickOutside);
        this.mentionsTextFormatterInstance =
            ChatConfigurator.getDataSource().getMentionsTextFormatter({
                theme: this.themeService.theme,
            });
        CometChat.getLoggedinUser()
            .then((user) => {
            this.loggedInUser = user;
        })
            .catch((error) => {
            if (this.onError) {
                this.onError(error);
            }
        });
        this.initializeMentionsFormatter();
        this.actions = ChatConfigurator.getDataSource().getAIOptions(this.themeService.theme, this.getComposerId(), this.aiOptionsStyle);
        this.aiBotList = [];
        this.subscribeToEvents();
        this.enableStickerKeyboard = true;
        this.stickerConfiguration =
            ChatConfigurator.getDataSource()?.getAuxiliaryOptions(this.composerId, this.user, this.group);
        if (this.stickerConfiguration?.id == StickersConstants.sticker) {
            this.enableStickerKeyboard = true;
        }
        else {
            this.enableStickerKeyboard = false;
        }
        this.enableAiFeatures();
    }
    enableAiFeatures() {
        if (this.actions && this.actions.length > 0) {
            this.isAiEnabled = true;
            this.actions.forEach((action) => {
                if (action.id === "ai-smart-reply") {
                    const newButton = {
                        ...action,
                        title: action.title,
                        onClick: this.getSmartReplies,
                    };
                    this.buttons.push(newButton);
                    this.ref.detectChanges();
                }
                if (action.id === "ai-conversation-summary") {
                    const newButton = {
                        ...action,
                        title: action.title,
                        id: action.id,
                        onClick: async () => this.callConversationSummaryMethod(),
                    };
                    this.buttons.push(newButton);
                    this.ref.detectChanges();
                }
                if (action.id === "ai-bots") {
                    const newButton = {
                        ...action,
                        title: action.title,
                        id: action.id,
                        onClick: async () => this.showAiBotMessageListMethod(action.onClick()),
                    };
                    this.buttons.push(newButton);
                    this.ref.detectChanges();
                }
            });
        }
    }
    composerWrapperStyle() {
        return {
            height: this.messageComposerStyle?.height,
            width: this.messageComposerStyle?.width,
            background: this.messageComposerStyle?.background,
            border: this.messageComposerStyle?.border,
            borderRadius: this.messageComposerStyle?.borderRadius,
        };
    }
    setTheme() {
        this.emojiPopover.boxShadow = `0px 0px 32px ${this.themeService.theme.palette.getAccent50()}`;
        this.stickerPopover.boxShadow = `0px 0px 32px ${this.themeService.theme.palette.getAccent50()}`;
        this.mediaRecordedPopover.boxShadow = `0px 0px 32px ${this.themeService.theme.palette.getAccent50()}`;
        this.aiPopover.background = this.themeService.theme.palette.getBackground();
        this.aiPopover.boxShadow = `0px 0px 32px ${this.themeService.theme.palette.getAccent50()}`;
        this.setComposerStyle();
        this.actionSheetStyle = {
            layoutModeIconTint: this.actionSheetStyle.layoutModeIconTint ||
                this.themeService.theme.palette.getAccent(),
            borderRadius: "inherit",
            background: this.themeService.theme.palette.getBackground(),
            border: "none",
            width: "100%",
            height: "100%",
            titleFont: this.actionSheetStyle.titleFont ||
                fontHelper(this.themeService.theme.typography.title2),
            titleColor: this.actionSheetStyle.titleColor ||
                this.themeService.theme.palette.getAccent(),
            ActionSheetSeparatorTint: this.actionSheetStyle.ActionSheetSeparatorTint ||
                this.themeService.theme.palette.getAccent400(),
        };
        this.aiActionSheetStyle = {
            layoutModeIconTint: this.aiActionSheetStyle.layoutModeIconTint ||
                this.themeService.theme.palette.getAccent(),
            borderRadius: "inherit",
            background: this.themeService.theme.palette.getBackground(),
            border: "none",
            width: "100%",
            height: "100%",
            titleFont: this.aiActionSheetStyle.titleFont ||
                fontHelper(this.themeService.theme.typography.title2),
            titleColor: this.aiActionSheetStyle.titleColor ||
                this.themeService.theme.palette.getAccent(),
            ActionSheetSeparatorTint: this.aiActionSheetStyle.ActionSheetSeparatorTint ||
                `1px solid ${this.themeService.theme.palette.getAccent400()}`,
        };
        this.textInputStyle = {
            height: "100%",
            width: "100%",
            maxHeight: this.messageComposerStyle?.maxInputHeight || "100px",
            border: this.messageComposerStyle?.inputBorder,
            borderRadius: this.messageComposerStyle?.inputBorderRadius,
            background: this.messageComposerStyle?.inputBackground,
            textFont: this.messageComposerStyle?.textFont,
            textColor: this.messageComposerStyle?.textColor,
            dividerColor: this.messageComposerStyle?.dividerTint,
        };
        this.disableSendButton();
        this.previewStyle = {
            height: "100%",
            width: "100%",
            border: `1px solid ${this.themeService.theme.palette.getAccent200()}`,
            background: this.themeService.theme.palette.getBackground(),
            previewTitleFont: this.messageComposerStyle?.previewTitleFont ||
                fontHelper(this.themeService.theme.typography.subtitle1),
            previewTitleColor: this.messageComposerStyle?.previewTitleColor ||
                this.themeService.theme.palette.getAccent400(),
            previewSubtitleColor: this.messageComposerStyle?.previewSubtitleColor ||
                this.themeService.theme.palette.getAccent400(),
            previewSubtitleFont: this.messageComposerStyle?.previewSubtitleFont ||
                fontHelper(this.themeService.theme.typography.subtitle2),
            closeButtonIconTint: this.messageComposerStyle?.closePreviewTint ||
                this.themeService.theme.palette.getAccent600(),
            borderRadius: '12px'
        };
        let buttonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            background: "transparent",
        };
        let defaultMediaRecorderStyle = new MediaRecorderStyle({
            startIconTint: this.themeService.theme.palette.getError(),
            submitIconTint: this.themeService.theme.palette.getAccent600(),
            stopIconTint: this.themeService.theme.palette.getError(),
            closeIconTint: this.themeService.theme.palette.getAccent600(),
            height: "100%",
            width: "100%",
            background: this.themeService.theme.palette.getBackground(),
            timerTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
            timerTextColor: this.themeService.theme.palette.getAccent400(),
        });
        this.mediaRecordedPopover.background =
            this.themeService.theme.palette.getBackground();
        this.mediaRecorderStyle.border = `1px solid ${this.themeService.theme.palette.getAccent100()}`;
        this.mediaRecorderStyle = {
            ...defaultMediaRecorderStyle,
            ...this.mediaRecorderStyle,
        };
        this.emojiPopover.boxShadow = `0px 0px 8px ${this.themeService.theme.palette.getAccent50()}`;
        this.stickerPopover.boxShadow = `0px 0px 8px ${this.themeService.theme.palette.getAccent50()}`;
        this.mediaRecordedPopover.boxShadow = `0px 0px 8px ${this.themeService.theme.palette.getAccent50()}`;
        this.emojiButtonStyle = {
            buttonIconTint: this.messageComposerStyle?.emojiIconTint ||
                this.themeService.theme.palette.getAccent600(),
            ...buttonStyle,
        };
        this.stickerButtonStyle = {
            buttonIconTint: this.themeService.theme.palette.getAccent600(),
            ...buttonStyle,
        };
        this.mediaRecorderButtonStyle = {
            buttonIconTint: this.themeService.theme.palette.getAccent600(),
            ...buttonStyle,
        };
        this.emojiKeyboardStyle = {
            width: "100%",
            height: "100%",
            border: "none",
            textFont: this.messageComposerStyle?.emojiKeyboardTextFont,
            textColor: this.messageComposerStyle?.emojiKeyboardTextColor,
            background: this.themeService.theme.palette.getBackground(),
            borderRadius: "12px",
            activeIconTint: this.themeService.theme.palette.getPrimary(),
            iconTint: this.themeService.theme.palette.getAccent600()
        };
        this.stickerKeyboardStyle = {
            width: "100%",
            height: "100%",
            border: "none",
            emptyStateTextFont: fontHelper(this.themeService.theme.typography.title1),
            emptyStateTextColor: this.themeService.theme.palette.getAccent600(),
            errorStateTextFont: fontHelper(this.themeService.theme.typography.title1),
            errorStateTextColor: this.themeService.theme.palette.getAccent600(),
            loadingIconTint: this.themeService.theme.palette.getAccent600(),
            background: this.themeService.theme.palette.getBackground(),
            borderRadius: "12px",
            categoryBackground: this.themeService.theme.palette.getBackground(),
        };
        this.attachmentButtonStyle = {
            height: "24px",
            width: "24px",
            border: "none",
            borderRadius: "0",
            buttonIconTint: this.messageComposerStyle?.attachIcontint ||
                this.themeService.theme.palette.getAccent600(),
            background: "transparent",
        };
        this.createPollStyle = {
            placeholderTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
            placeholderTextColor: this.themeService.theme.palette.getAccent600(),
            deleteIconTint: this.themeService.theme.palette.getAccent600(),
            titleFont: fontHelper(this.themeService.theme.typography.title1),
            titleColor: this.themeService.theme.palette.getAccent(),
            closeIconTint: this.themeService.theme.palette.getPrimary(),
            questionInputBackground: this.themeService.theme.palette.getAccent100(),
            optionInputBackground: this.themeService.theme.palette.getAccent100(),
            answerHelpTextFont: fontHelper(this.themeService.theme.typography.caption1),
            answerHelpTextColor: this.themeService.theme.palette.getAccent400(),
            addAnswerIconTint: this.themeService.theme.palette.getPrimary(),
            createPollButtonTextFont: fontHelper(this.themeService.theme.typography.text2),
            createPollButtonTextColor: this.themeService.theme.palette.getAccent("dark"),
            createPollButtonBackground: this.themeService.theme.palette.getPrimary(),
            addAnswerTextFont: fontHelper(this.themeService.theme.typography.text2),
            addAnswerTextColor: this.themeService.theme.palette.getPrimary(),
            errorTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
            errorTextColor: this.themeService.theme.palette.getError(),
            optionPlaceholderTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
            optionPlaceholderTextColor: this.themeService.theme.palette.getAccent600(),
            questionInputTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
            questionInputTextColor: this.themeService.theme.palette.getAccent600(),
            optionInputTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
            optionInputTextColor: this.themeService.theme.palette.getAccent600(),
            width: "360px",
            height: "620px",
            border: "",
            borderRadius: "8px",
            background: this.themeService.theme.palette.getAccent900(),
        };
    }
    setComposerStyle() {
        let defaultStyle = new MessageComposerStyle({
            background: this.themeService.theme.palette.getBackground(),
            border: `none`,
            height: "100%",
            width: "100%",
            borderRadius: "0",
            attachIcontint: this.themeService.theme.palette.getAccent500(),
            sendIconTint: this.themeService.theme.palette.getPrimary(),
            emojiIconTint: this.themeService.theme.palette.getAccent500(),
            inputBackground: this.themeService.theme.palette.getAccent100(),
            inputBorder: "none",
            inputBorderRadius: "12px",
            dividerTint: this.themeService.theme.palette.getAccent200(),
            textFont: fontHelper(this.themeService.theme.typography.subtitle1),
            textColor: this.themeService.theme.palette.getAccent(),
            emojiKeyboardTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
            emojiKeyboardTextColor: this.themeService.theme.palette.getAccent400(),
            previewTitleFont: fontHelper(this.themeService.theme.typography.subtitle1),
            previewTitleColor: this.themeService.theme.palette.getAccent(),
            previewSubtitleFont: fontHelper(this.themeService.theme.typography.subtitle2),
            previewSubtitleColor: this.themeService.theme.palette.getAccent600(),
            closePreviewTint: this.themeService.theme.palette.getAccent500(),
            maxInputHeight: "100px",
        });
        this.messageComposerStyle = {
            ...defaultStyle,
            ...this.messageComposerStyle,
        };
    }
    closePreview() {
        this.showSendButton = false;
        this.showListForMentions = false;
        this.showMentionsCountWarning = false;
        this.showPreview = false;
        this.editPreviewText = "";
        this.messageToBeEdited = null;
        this.text = "";
        this.messageText = "";
        this.inputRef?.nativeElement?.emptyInputField();
        this.disableSendButton();
    }
}
CometChatMessageComposerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CometChatMessageComposerComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.CometChatThemeService }], target: i0.ɵɵFactoryTarget.Component });
CometChatMessageComposerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CometChatMessageComposerComponent, selector: "cometchat-message-composer", inputs: { user: "user", group: "group", disableSoundForMessages: "disableSoundForMessages", customSoundForMessage: "customSoundForMessage", disableTypingEvents: "disableTypingEvents", text: "text", placeholderText: "placeholderText", headerView: "headerView", onTextChange: "onTextChange", attachmentIconURL: "attachmentIconURL", attachmentOptions: "attachmentOptions", secondaryButtonView: "secondaryButtonView", auxilaryButtonView: "auxilaryButtonView", auxiliaryButtonsAlignment: "auxiliaryButtonsAlignment", sendButtonView: "sendButtonView", parentMessageId: "parentMessageId", hideLiveReaction: "hideLiveReaction", LiveReactionIconURL: "LiveReactionIconURL", backButtonIconURL: "backButtonIconURL", mentionsWarningText: "mentionsWarningText", mentionsWarningStyle: "mentionsWarningStyle", messageComposerStyle: "messageComposerStyle", onSendButtonClick: "onSendButtonClick", onError: "onError", backdropStyle: "backdropStyle", actionSheetStyle: "actionSheetStyle", aiActionSheetStyle: "aiActionSheetStyle", hideVoiceRecording: "hideVoiceRecording", mediaRecorderStyle: "mediaRecorderStyle", aiOptionsStyle: "aiOptionsStyle", aiIconURL: "aiIconURL", voiceRecordingIconURL: "voiceRecordingIconURL", voiceRecordingCloseIconURL: "voiceRecordingCloseIconURL", voiceRecordingStartIconURL: "voiceRecordingStartIconURL", voiceRecordingStopIconURL: "voiceRecordingStopIconURL", voiceRecordingSubmitIconURL: "voiceRecordingSubmitIconURL", userMemberWrapperConfiguration: "userMemberWrapperConfiguration", disableMentions: "disableMentions", textFormatters: "textFormatters" }, outputs: { childEvent: "childEvent" }, viewQueries: [{ propertyName: "inputElementRef", first: true, predicate: ["inputElement"], descendants: true }, { propertyName: "inputRef", first: true, predicate: ["inputRef"], descendants: true }, { propertyName: "emojiButtonRef", first: true, predicate: ["emojiButtonRef"], descendants: true }, { propertyName: "actionSheetRef", first: true, predicate: ["actionSheetRef"], descendants: true }, { propertyName: "stickerButtonRef", first: true, predicate: ["stickerButtonRef"], descendants: true }, { propertyName: "mediaRecordedRef", first: true, predicate: ["mediaRecordedRef"], descendants: true }, { propertyName: "aiButtonRef", first: true, predicate: ["aiButtonRef"], descendants: true }, { propertyName: "userMemberWrapperRef", first: true, predicate: ["userMemberWrapperRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"cc-message-composer__wrapper\" [ngStyle]=\"composerWrapperStyle()\">\n  <div class=\"cc-messagecomposer__mentions\" #userMemberWrapperRef>\n    <cometchat-user-member-wrapper *ngIf=\"showListForMentions\"\n      [userMemberListType]=\"userMemberListType\"\n      [onItemClick]=\"userMemberWrapperConfiguration.onItemClick || defaultMentionsItemClickHandler\"\n      [usersRequestBuilder]=\"usersRequestBuilder\"\n      [searchKeyword]=\"mentionsSearchTerm\"\n      [subtitleView]=\"userMemberWrapperConfiguration.subtitleView\"\n      [disableUsersPresence]=\"userMemberWrapperConfiguration.disableUsersPresence\"\n      [avatarStyle]=\"userMemberWrapperConfiguration.avatarStyle\"\n      [listItemView]=\"userMemberWrapperConfiguration.listItemView\"\n      [statusIndicatorStyle]=\"userMemberWrapperConfiguration.statusIndicatorStyle\"\n      [userPresencePlacement]=\"userMemberWrapperConfiguration.userPresencePlacement\"\n      [hideSeperator]=\"userMemberWrapperConfiguration.hideSeparator\"\n      [loadingStateView]=\"userMemberWrapperConfiguration.loadingStateView\"\n      [onEmpty]=\"defaultOnEmptyForMentions\"\n      [loadingIconUrl]=\"userMemberWrapperConfiguration.loadingIconURL\"\n      [group]=\"group\" [groupMemberRequestBuilder]=\"groupMembersRequestBuilder\"\n      [disableLoadingState]=\"true\"\n      [onError]=\"defaultOnEmptyForMentions\"></cometchat-user-member-wrapper>\n\n    <div *ngIf=\"showMentionsCountWarning\"\n      class=\"cc-messagecomposer__mentions-limit-exceeded\">\n      <cometchat-icon-button\n        [text]=\"mentionsWarningText || localize('MENTIONS_LIMIT_WARNING_MESSAGE')\"\n        [iconURL]=\"InfoSimpleIcon\"\n        [buttonStyle]=\"getMentionInfoIconStyle()\"></cometchat-icon-button>\n    </div>\n\n  </div>\n  <div class=\"cc-message-composer__header-view\"\n    *ngIf=\"headerView; else messagePreview\">\n    <ng-container\n      *ngTemplateOutlet=\"headerView;context:{ $implicit: user ?? group, composerId:composerId }\">\n    </ng-container>\n  </div>\n  <ng-template #messagePreview>\n    <div class=\"cc-message-composer__header-view\" *ngIf=\"showPreview\">\n      <cometchat-preview [previewStyle]=\"previewStyle\"\n        [previewSubtitle]=\"editPreviewText\"\n        (cc-preview-close-clicked)=\"closePreview()\"> </cometchat-preview>\n    </div>\n  </ng-template>\n  <div class=\"cc-message-composer__input\">\n\n    <cometchat-text-input (cc-text-input-entered)=\"sendMessageOnEnter($event)\"\n      #inputRef [text]=\"text\"\n      (cc-text-input-changed)=\"messageInputChanged($event)\"\n      [textInputStyle]=\"textInputStyle\" [placeholderText]=\"placeholderText\"\n      [auxiliaryButtonAlignment]=\"auxiliaryButtonsAlignment\"\n      [textFormatters]=\"textFormatters\">\n\n      <div data-slot=\"secondaryView\">\n        <div *ngIf=\"secondaryButtonView;else secondaryButton\">\n          <ng-container\n            *ngTemplateOutlet=\"secondaryButtonView;context:{ $implicit: user ?? group, composerId:composerId }\">\n          </ng-container>\n        </div>\n        <ng-template #secondaryButton>\n          <div class=\"cc-message-composer__attachbutton\">\n            <cometchat-popover\n              (cc-popover-outside-click)=\"openActionSheet($event)\"\n              [placement]=\"auxilaryPlacement\" [popoverStyle]=\"popoverStyle\">\n              <cometchat-action-sheet slot=\"content\" [actions]=\"composerActions\"\n                [actionSheetStyle]=\"actionSheetStyle\"\n                (cc-actionsheet-clicked)=\"handleActions($event)\">\n              </cometchat-action-sheet>\n              <cometchat-button #actionSheetRef slot=\"children\"\n                (cc-button-clicked)=\"openActionSheet($event)\"\n                [iconURL]=\"!showActionSheetItem || (showEmojiKeyboard && !showActionSheetItem)  ? attachmentIconURL  : closeButtonIconURL\"\n                [buttonStyle]=\"attachmentButtonStyle\"></cometchat-button>\n            </cometchat-popover>\n          </div>\n        </ng-template>\n      </div>\n\n      <div class=\"cc-message-composer__auxiliary\" data-slot=\"auxilaryView\">\n        <div class=\"cc-message-composer__custom-auxiliary-view\"\n          *ngIf=\"auxilaryButtonView\">\n          <ng-container\n            *ngTemplateOutlet=\"auxilaryButtonView;context:{ $implicit: user ?? group, composerId:composerId }\">\n          </ng-container>\n        </div>\n        <!-- AI Cards -->\n        <div class=\"cc-message-composer__stickerkeyboard\">\n          <cometchat-popover (cc-popover-click)=\"openStickerKeyboard($event)\"\n            [popoverStyle]=\"aiPopover\" [placement]=\"auxilaryPlacement\">\n            <cometchat-ai-card [state]=\"smartReplyState\"\n              *ngIf=\"showSmartReply && !showActionSheetItemAI && !showAiBotList\"\n              slot=\"content\" [loadingStateText]=\"loadingStateText\"\n              [emptyStateText]=\"emptyStateText\"\n              [errorStateText]=\"errorStateText\">\n              <div slot=\"loadedView\" class=\"smart-replies-wrapper\">\n\n                <div class=\"cc-message-composer__smartreply-header\">\n                  <div class=\"cc-message-composer__back-button\">\n                    <cometchat-button\n                      *ngIf=\"repliesArray && repliesArray.length > 0 \"\n                      [iconURL]=\"backButtonIconURL\"\n                      (cc-button-clicked)=\"onAiBackButtonClick()\"\n                      [buttonStyle]=\"backButtonStyle()\">\n                    </cometchat-button>\n                  </div>\n                  <div class=\"cc-message-composer__smartreply-header-view\">\n                    <p>{{ localize(\"SUGGEST_A_REPLY\") }}</p>\n                  </div>\n                </div>\n\n                <div class=\"cc-message-composer__smartreply-content\">\n                  <smart-replies\n                    *ngIf=\"repliesArray && repliesArray.length > 0 \"\n                    [smartReplyStyle]=\"smartReplyStyle\" [replies]=\"repliesArray\"\n                    [closeIconURL]=\"''\" (cc-reply-clicked)=\"sendReply($event)\">\n                  </smart-replies>\n                </div>\n\n\n\n\n\n              </div>\n            </cometchat-ai-card>\n\n            <div *ngIf=\"showAiBotList  && !showActionSheetItemAI\"\n              slot=\"content\">\n              <div class=\"cc-message-composer__aibotlist\">\n                <cometchat-button *ngIf=\" aiBotList && aiBotList.length> 1 \"\n                  [iconURL]=\"backButtonIconURL\"\n                  (cc-button-clicked)=\"onAiBackButtonClick()\"\n                  [buttonStyle]=\"backButtonStyle()\">\n                </cometchat-button>\n                <p>{{ localize(\"COMETCHAT_ASK_AI_BOT\") }}</p>\n              </div>\n              <cometchat-action-sheet\n                *ngIf=\"showAiBotList  && !showActionSheetItemAI\" slot=\"content\"\n                [actions]=\"aiActionButtons\" [title]=\"'AI'\"\n                [actionSheetStyle]=\"aiActionSheetStyle\" [hideLayoutMode]=\"true\"\n                (cc-actionsheet-clicked)=\"handleActions($event)\">\n              </cometchat-action-sheet>\n            </div>\n\n            <cometchat-action-sheet *ngIf=\"showActionSheetItemAI\" slot=\"content\"\n              [actions]=\"buttons\" [title]=\"'AI'\"\n              [actionSheetStyle]=\"aiActionSheetStyle\" [hideLayoutMode]=\"true\"\n              (cc-actionsheet-clicked)=\"handleActions($event)\">\n            </cometchat-action-sheet>\n\n            <cometchat-button *ngIf=\"isAiEnabled\" [hoverText]=\"localize('AI')\"\n              slot=\"children\" #aiButtonRef\n              (cc-button-clicked)=\"openAiFeatures($event)\"\n              [iconURL]=\"!showAiFeatures ? aiIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"stickerButtonStyle\"></cometchat-button>\n          </cometchat-popover>\n        </div>\n\n        <div class=\"cc-message-composer__stickerkeyboard\"\n          *ngIf=\"enableStickerKeyboard\">\n          <cometchat-popover\n            (cc-popover-outside-click)=\"openStickerKeyboard($event)\"\n            [popoverStyle]=\"stickerPopover\" [placement]=\"auxilaryPlacement\">\n            <stickers-keyboard slot=\"content\"\n              [stickerStyle]=\"stickerKeyboardStyle\"\n              (cc-sticker-clicked)=\"sendSticker($event)\">\n            </stickers-keyboard>\n            <cometchat-button [hoverText]=\"localize('STICKER')\" slot=\"children\"\n              #stickerButtonRef\n              (cc-button-clicked)=\"openStickerKeyboard($event)\"\n              [iconURL]=\" !showStickerKeyboard ? stickerButtonIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"stickerButtonStyle\"></cometchat-button>\n          </cometchat-popover>\n        </div>\n        <div class=\"cc-message-composer__emojikeyboard\">\n          <cometchat-popover\n            (cc-popover-outside-click)=\"openEmojiKeyboard($event)\"\n            [placement]=\"auxilaryPlacement\" [popoverStyle]=\"emojiPopover\">\n            <cometchat-emoji-keyboard slot=\"content\"\n              [emojiKeyboardStyle]=\"emojiKeyboardStyle\"\n              (cc-emoji-clicked)=\"appendEmoji($event)\">\n            </cometchat-emoji-keyboard>\n            <cometchat-button #emojiButtonRef [hoverText]=\"localize('EMOJI')\"\n              slot=\"children\" (cc-button-clicked)=\"openEmojiKeyboard($event)\"\n              [iconURL]=\" !showEmojiKeyboard  || (!showEmojiKeyboard && showActionSheetItem) ? emojiButtonIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"emojiButtonStyle\"></cometchat-button>\n          </cometchat-popover>\n        </div>\n        <div class=\"cc-message-composer__mediarecorder\"\n          *ngIf=\"!hideVoiceRecording\">\n          <cometchat-popover [closeOnOutsideClick]=\"false\"\n            [popoverStyle]=\"mediaRecordedPopover\"\n            [placement]=\"auxilaryPlacement\">\n\n            <cometchat-media-recorder *ngIf=\"toggleMediaRecorded\"\n              [autoRecording]=\"true\" startIconText=\"\" stopIconText=\"\"\n              submitButtonIconText=\"\"\n              [submitButtonIconURL]=\"voiceRecordingSubmitIconURL\"\n              [startIconURL]=\"voiceRecordingStartIconURL\"\n              [stopIconURL]=\"voiceRecordingStopIconURL\"\n              [closeIconURL]=\"voiceRecordingCloseIconURL\"\n              (cc-media-recorder-submitted)=\"sendRecordedMedia($event)\"\n              (cc-media-recorder-closed)=\"closeMediaRecorder($event)\"\n              slot=\"content\"\n              [mediaPlayerStyle]=\"mediaRecorderStyle\"></cometchat-media-recorder>\n            <cometchat-icon-button [hoverText]=\"localize('VOICE_RECORDING')\"\n              slot=\"children\" #mediaRecordedRef\n              (cc-button-clicked)=\"openMediaRecorded($event)\"\n              [iconURL]=\" !toggleMediaRecorded ? voiceRecordingIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"mediaRecorderButtonStyle\"></cometchat-icon-button>\n          </cometchat-popover>\n        </div>\n      </div>\n      <div data-slot=\"primaryView\">\n        <div *ngIf=\"sendButtonView;else sendButton\">\n        </div>\n        <ng-template #sendButton>\n          <div class=\"cc-message-composer__sendbutton\"\n            *ngIf=\"showSendButton || hideLiveReaction\">\n            <cometchat-button [iconURL]=\"sendButtonIconURL\"\n              [buttonStyle]=\"sendButtonStyle\"\n              [hoverText]=\"localize('SEND_MESSAGE')\"\n              (cc-button-clicked)=\"customSendMethod(messageText)\">\n            </cometchat-button>\n          </div>\n          <div class=\"cc-message-composer__livereaction\"\n            *ngIf=\"!hideLiveReaction && !showSendButton\">\n            <cometchat-button [iconURL]=\"LiveReactionIconURL\"\n              [hoverText]=\"localize('LIVE_REACTION')\"\n              [buttonStyle]=\"liveReactionStyle\"\n              (cc-button-clicked)=\"sendReaction()\"></cometchat-button>\n          </div>\n        </ng-template>\n      </div>\n    </cometchat-text-input>\n  </div>\n</div>\n\n<input class=\"cc-message-composer__mediainput\" #inputElement\n  (change)=\"inputChangeHandler($event)\" />\n<cometchat-backdrop *ngIf=\"showCreatePolls\" [backdropStyle]=\"backdropStyle\">\n  <create-poll [user]=\"user\" [group]=\"group\"\n    (cc-close-clicked)=\"closeCreatePolls()\"\n    [createPollStyle]=\"createPollStyle\"></create-poll>\n</cometchat-backdrop>\n", styles: [".cc-message-composer__sendbutton,.cc-message-composer__livereaction{margin:0 5px}.cc-message-composer__wrapper{height:100%;width:100%;position:relative;padding:14px 16px}.cc-message-composer__header-view{height:-moz-fit-content;height:fit-content;width:100%;bottom:120%;padding:0 0 1px}.cc-message-composer__mediainput{display:none}.cc-message-composer__auxiliary{display:flex;gap:8px}.cc-message-composer__smartreply-header{width:100%;display:flex;align-items:center;position:absolute;padding:10px;top:0;z-index:1}.cc-message-composer__back-button{margin-left:2%}.cc-message-composer__smartreply-header-view{margin-left:14%}.cc-message-composer__smartreply-content{max-height:200px}.cc-message-composer__aibotlist{display:flex;padding:10px;align-items:center;gap:45px;font-size:medium}.cc-messagecomposer__mentions{max-height:196px;min-height:28px;overflow:hidden;position:absolute;width:100%;left:50%;transform:translate(-50%,-100%);z-index:2;display:flex;padding:0 16px 1px 14px;box-sizing:border-box}.cc-messagecomposer__mentions cometchat-user-member-wrapper{max-height:196px;min-height:28px;overflow:hidden;width:100%;box-sizing:border-box;min-height:45px}.cc-messagecomposer__mentions::-webkit-scrollbar{display:none}.cc-messagecomposer__mentions-limit-exceeded{margin-top:20px;left:2px;position:relative;padding-left:13px;background-color:#fff}*{box-sizing:border-box}cometchat-ai-card{height:100%;width:100%;display:flex;border-radius:8px;overflow-y:auto;justify-content:center;align-items:center}cometchat-popover{position:relative}\n"], components: [{ type: i2.CometChatUserMemberWrapperComponent, selector: "cometchat-user-member-wrapper", inputs: ["userMemberListType", "onItemClick", "listItemView", "avatarStyle", "statusIndicatorStyle", "searchKeyword", "group", "subtitleView", "usersRequestBuilder", "disableUsersPresence", "userPresencePlacement", "hideSeperator", "loadingStateView", "onEmpty", "onError", "groupMemberRequestBuilder", "loadingIconUrl", "disableLoadingState"] }], directives: [{ type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CometChatMessageComposerComponent, decorators: [{
            type: Component,
            args: [{ selector: "cometchat-message-composer", changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cc-message-composer__wrapper\" [ngStyle]=\"composerWrapperStyle()\">\n  <div class=\"cc-messagecomposer__mentions\" #userMemberWrapperRef>\n    <cometchat-user-member-wrapper *ngIf=\"showListForMentions\"\n      [userMemberListType]=\"userMemberListType\"\n      [onItemClick]=\"userMemberWrapperConfiguration.onItemClick || defaultMentionsItemClickHandler\"\n      [usersRequestBuilder]=\"usersRequestBuilder\"\n      [searchKeyword]=\"mentionsSearchTerm\"\n      [subtitleView]=\"userMemberWrapperConfiguration.subtitleView\"\n      [disableUsersPresence]=\"userMemberWrapperConfiguration.disableUsersPresence\"\n      [avatarStyle]=\"userMemberWrapperConfiguration.avatarStyle\"\n      [listItemView]=\"userMemberWrapperConfiguration.listItemView\"\n      [statusIndicatorStyle]=\"userMemberWrapperConfiguration.statusIndicatorStyle\"\n      [userPresencePlacement]=\"userMemberWrapperConfiguration.userPresencePlacement\"\n      [hideSeperator]=\"userMemberWrapperConfiguration.hideSeparator\"\n      [loadingStateView]=\"userMemberWrapperConfiguration.loadingStateView\"\n      [onEmpty]=\"defaultOnEmptyForMentions\"\n      [loadingIconUrl]=\"userMemberWrapperConfiguration.loadingIconURL\"\n      [group]=\"group\" [groupMemberRequestBuilder]=\"groupMembersRequestBuilder\"\n      [disableLoadingState]=\"true\"\n      [onError]=\"defaultOnEmptyForMentions\"></cometchat-user-member-wrapper>\n\n    <div *ngIf=\"showMentionsCountWarning\"\n      class=\"cc-messagecomposer__mentions-limit-exceeded\">\n      <cometchat-icon-button\n        [text]=\"mentionsWarningText || localize('MENTIONS_LIMIT_WARNING_MESSAGE')\"\n        [iconURL]=\"InfoSimpleIcon\"\n        [buttonStyle]=\"getMentionInfoIconStyle()\"></cometchat-icon-button>\n    </div>\n\n  </div>\n  <div class=\"cc-message-composer__header-view\"\n    *ngIf=\"headerView; else messagePreview\">\n    <ng-container\n      *ngTemplateOutlet=\"headerView;context:{ $implicit: user ?? group, composerId:composerId }\">\n    </ng-container>\n  </div>\n  <ng-template #messagePreview>\n    <div class=\"cc-message-composer__header-view\" *ngIf=\"showPreview\">\n      <cometchat-preview [previewStyle]=\"previewStyle\"\n        [previewSubtitle]=\"editPreviewText\"\n        (cc-preview-close-clicked)=\"closePreview()\"> </cometchat-preview>\n    </div>\n  </ng-template>\n  <div class=\"cc-message-composer__input\">\n\n    <cometchat-text-input (cc-text-input-entered)=\"sendMessageOnEnter($event)\"\n      #inputRef [text]=\"text\"\n      (cc-text-input-changed)=\"messageInputChanged($event)\"\n      [textInputStyle]=\"textInputStyle\" [placeholderText]=\"placeholderText\"\n      [auxiliaryButtonAlignment]=\"auxiliaryButtonsAlignment\"\n      [textFormatters]=\"textFormatters\">\n\n      <div data-slot=\"secondaryView\">\n        <div *ngIf=\"secondaryButtonView;else secondaryButton\">\n          <ng-container\n            *ngTemplateOutlet=\"secondaryButtonView;context:{ $implicit: user ?? group, composerId:composerId }\">\n          </ng-container>\n        </div>\n        <ng-template #secondaryButton>\n          <div class=\"cc-message-composer__attachbutton\">\n            <cometchat-popover\n              (cc-popover-outside-click)=\"openActionSheet($event)\"\n              [placement]=\"auxilaryPlacement\" [popoverStyle]=\"popoverStyle\">\n              <cometchat-action-sheet slot=\"content\" [actions]=\"composerActions\"\n                [actionSheetStyle]=\"actionSheetStyle\"\n                (cc-actionsheet-clicked)=\"handleActions($event)\">\n              </cometchat-action-sheet>\n              <cometchat-button #actionSheetRef slot=\"children\"\n                (cc-button-clicked)=\"openActionSheet($event)\"\n                [iconURL]=\"!showActionSheetItem || (showEmojiKeyboard && !showActionSheetItem)  ? attachmentIconURL  : closeButtonIconURL\"\n                [buttonStyle]=\"attachmentButtonStyle\"></cometchat-button>\n            </cometchat-popover>\n          </div>\n        </ng-template>\n      </div>\n\n      <div class=\"cc-message-composer__auxiliary\" data-slot=\"auxilaryView\">\n        <div class=\"cc-message-composer__custom-auxiliary-view\"\n          *ngIf=\"auxilaryButtonView\">\n          <ng-container\n            *ngTemplateOutlet=\"auxilaryButtonView;context:{ $implicit: user ?? group, composerId:composerId }\">\n          </ng-container>\n        </div>\n        <!-- AI Cards -->\n        <div class=\"cc-message-composer__stickerkeyboard\">\n          <cometchat-popover (cc-popover-click)=\"openStickerKeyboard($event)\"\n            [popoverStyle]=\"aiPopover\" [placement]=\"auxilaryPlacement\">\n            <cometchat-ai-card [state]=\"smartReplyState\"\n              *ngIf=\"showSmartReply && !showActionSheetItemAI && !showAiBotList\"\n              slot=\"content\" [loadingStateText]=\"loadingStateText\"\n              [emptyStateText]=\"emptyStateText\"\n              [errorStateText]=\"errorStateText\">\n              <div slot=\"loadedView\" class=\"smart-replies-wrapper\">\n\n                <div class=\"cc-message-composer__smartreply-header\">\n                  <div class=\"cc-message-composer__back-button\">\n                    <cometchat-button\n                      *ngIf=\"repliesArray && repliesArray.length > 0 \"\n                      [iconURL]=\"backButtonIconURL\"\n                      (cc-button-clicked)=\"onAiBackButtonClick()\"\n                      [buttonStyle]=\"backButtonStyle()\">\n                    </cometchat-button>\n                  </div>\n                  <div class=\"cc-message-composer__smartreply-header-view\">\n                    <p>{{ localize(\"SUGGEST_A_REPLY\") }}</p>\n                  </div>\n                </div>\n\n                <div class=\"cc-message-composer__smartreply-content\">\n                  <smart-replies\n                    *ngIf=\"repliesArray && repliesArray.length > 0 \"\n                    [smartReplyStyle]=\"smartReplyStyle\" [replies]=\"repliesArray\"\n                    [closeIconURL]=\"''\" (cc-reply-clicked)=\"sendReply($event)\">\n                  </smart-replies>\n                </div>\n\n\n\n\n\n              </div>\n            </cometchat-ai-card>\n\n            <div *ngIf=\"showAiBotList  && !showActionSheetItemAI\"\n              slot=\"content\">\n              <div class=\"cc-message-composer__aibotlist\">\n                <cometchat-button *ngIf=\" aiBotList && aiBotList.length> 1 \"\n                  [iconURL]=\"backButtonIconURL\"\n                  (cc-button-clicked)=\"onAiBackButtonClick()\"\n                  [buttonStyle]=\"backButtonStyle()\">\n                </cometchat-button>\n                <p>{{ localize(\"COMETCHAT_ASK_AI_BOT\") }}</p>\n              </div>\n              <cometchat-action-sheet\n                *ngIf=\"showAiBotList  && !showActionSheetItemAI\" slot=\"content\"\n                [actions]=\"aiActionButtons\" [title]=\"'AI'\"\n                [actionSheetStyle]=\"aiActionSheetStyle\" [hideLayoutMode]=\"true\"\n                (cc-actionsheet-clicked)=\"handleActions($event)\">\n              </cometchat-action-sheet>\n            </div>\n\n            <cometchat-action-sheet *ngIf=\"showActionSheetItemAI\" slot=\"content\"\n              [actions]=\"buttons\" [title]=\"'AI'\"\n              [actionSheetStyle]=\"aiActionSheetStyle\" [hideLayoutMode]=\"true\"\n              (cc-actionsheet-clicked)=\"handleActions($event)\">\n            </cometchat-action-sheet>\n\n            <cometchat-button *ngIf=\"isAiEnabled\" [hoverText]=\"localize('AI')\"\n              slot=\"children\" #aiButtonRef\n              (cc-button-clicked)=\"openAiFeatures($event)\"\n              [iconURL]=\"!showAiFeatures ? aiIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"stickerButtonStyle\"></cometchat-button>\n          </cometchat-popover>\n        </div>\n\n        <div class=\"cc-message-composer__stickerkeyboard\"\n          *ngIf=\"enableStickerKeyboard\">\n          <cometchat-popover\n            (cc-popover-outside-click)=\"openStickerKeyboard($event)\"\n            [popoverStyle]=\"stickerPopover\" [placement]=\"auxilaryPlacement\">\n            <stickers-keyboard slot=\"content\"\n              [stickerStyle]=\"stickerKeyboardStyle\"\n              (cc-sticker-clicked)=\"sendSticker($event)\">\n            </stickers-keyboard>\n            <cometchat-button [hoverText]=\"localize('STICKER')\" slot=\"children\"\n              #stickerButtonRef\n              (cc-button-clicked)=\"openStickerKeyboard($event)\"\n              [iconURL]=\" !showStickerKeyboard ? stickerButtonIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"stickerButtonStyle\"></cometchat-button>\n          </cometchat-popover>\n        </div>\n        <div class=\"cc-message-composer__emojikeyboard\">\n          <cometchat-popover\n            (cc-popover-outside-click)=\"openEmojiKeyboard($event)\"\n            [placement]=\"auxilaryPlacement\" [popoverStyle]=\"emojiPopover\">\n            <cometchat-emoji-keyboard slot=\"content\"\n              [emojiKeyboardStyle]=\"emojiKeyboardStyle\"\n              (cc-emoji-clicked)=\"appendEmoji($event)\">\n            </cometchat-emoji-keyboard>\n            <cometchat-button #emojiButtonRef [hoverText]=\"localize('EMOJI')\"\n              slot=\"children\" (cc-button-clicked)=\"openEmojiKeyboard($event)\"\n              [iconURL]=\" !showEmojiKeyboard  || (!showEmojiKeyboard && showActionSheetItem) ? emojiButtonIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"emojiButtonStyle\"></cometchat-button>\n          </cometchat-popover>\n        </div>\n        <div class=\"cc-message-composer__mediarecorder\"\n          *ngIf=\"!hideVoiceRecording\">\n          <cometchat-popover [closeOnOutsideClick]=\"false\"\n            [popoverStyle]=\"mediaRecordedPopover\"\n            [placement]=\"auxilaryPlacement\">\n\n            <cometchat-media-recorder *ngIf=\"toggleMediaRecorded\"\n              [autoRecording]=\"true\" startIconText=\"\" stopIconText=\"\"\n              submitButtonIconText=\"\"\n              [submitButtonIconURL]=\"voiceRecordingSubmitIconURL\"\n              [startIconURL]=\"voiceRecordingStartIconURL\"\n              [stopIconURL]=\"voiceRecordingStopIconURL\"\n              [closeIconURL]=\"voiceRecordingCloseIconURL\"\n              (cc-media-recorder-submitted)=\"sendRecordedMedia($event)\"\n              (cc-media-recorder-closed)=\"closeMediaRecorder($event)\"\n              slot=\"content\"\n              [mediaPlayerStyle]=\"mediaRecorderStyle\"></cometchat-media-recorder>\n            <cometchat-icon-button [hoverText]=\"localize('VOICE_RECORDING')\"\n              slot=\"children\" #mediaRecordedRef\n              (cc-button-clicked)=\"openMediaRecorded($event)\"\n              [iconURL]=\" !toggleMediaRecorded ? voiceRecordingIconURL : closeButtonIconURL\"\n              [buttonStyle]=\"mediaRecorderButtonStyle\"></cometchat-icon-button>\n          </cometchat-popover>\n        </div>\n      </div>\n      <div data-slot=\"primaryView\">\n        <div *ngIf=\"sendButtonView;else sendButton\">\n        </div>\n        <ng-template #sendButton>\n          <div class=\"cc-message-composer__sendbutton\"\n            *ngIf=\"showSendButton || hideLiveReaction\">\n            <cometchat-button [iconURL]=\"sendButtonIconURL\"\n              [buttonStyle]=\"sendButtonStyle\"\n              [hoverText]=\"localize('SEND_MESSAGE')\"\n              (cc-button-clicked)=\"customSendMethod(messageText)\">\n            </cometchat-button>\n          </div>\n          <div class=\"cc-message-composer__livereaction\"\n            *ngIf=\"!hideLiveReaction && !showSendButton\">\n            <cometchat-button [iconURL]=\"LiveReactionIconURL\"\n              [hoverText]=\"localize('LIVE_REACTION')\"\n              [buttonStyle]=\"liveReactionStyle\"\n              (cc-button-clicked)=\"sendReaction()\"></cometchat-button>\n          </div>\n        </ng-template>\n      </div>\n    </cometchat-text-input>\n  </div>\n</div>\n\n<input class=\"cc-message-composer__mediainput\" #inputElement\n  (change)=\"inputChangeHandler($event)\" />\n<cometchat-backdrop *ngIf=\"showCreatePolls\" [backdropStyle]=\"backdropStyle\">\n  <create-poll [user]=\"user\" [group]=\"group\"\n    (cc-close-clicked)=\"closeCreatePolls()\"\n    [createPollStyle]=\"createPollStyle\"></create-poll>\n</cometchat-backdrop>\n", styles: [".cc-message-composer__sendbutton,.cc-message-composer__livereaction{margin:0 5px}.cc-message-composer__wrapper{height:100%;width:100%;position:relative;padding:14px 16px}.cc-message-composer__header-view{height:-moz-fit-content;height:fit-content;width:100%;bottom:120%;padding:0 0 1px}.cc-message-composer__mediainput{display:none}.cc-message-composer__auxiliary{display:flex;gap:8px}.cc-message-composer__smartreply-header{width:100%;display:flex;align-items:center;position:absolute;padding:10px;top:0;z-index:1}.cc-message-composer__back-button{margin-left:2%}.cc-message-composer__smartreply-header-view{margin-left:14%}.cc-message-composer__smartreply-content{max-height:200px}.cc-message-composer__aibotlist{display:flex;padding:10px;align-items:center;gap:45px;font-size:medium}.cc-messagecomposer__mentions{max-height:196px;min-height:28px;overflow:hidden;position:absolute;width:100%;left:50%;transform:translate(-50%,-100%);z-index:2;display:flex;padding:0 16px 1px 14px;box-sizing:border-box}.cc-messagecomposer__mentions cometchat-user-member-wrapper{max-height:196px;min-height:28px;overflow:hidden;width:100%;box-sizing:border-box;min-height:45px}.cc-messagecomposer__mentions::-webkit-scrollbar{display:none}.cc-messagecomposer__mentions-limit-exceeded{margin-top:20px;left:2px;position:relative;padding-left:13px;background-color:#fff}*{box-sizing:border-box}cometchat-ai-card{height:100%;width:100%;display:flex;border-radius:8px;overflow-y:auto;justify-content:center;align-items:center}cometchat-popover{position:relative}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.CometChatThemeService }]; }, propDecorators: { inputElementRef: [{
                type: ViewChild,
                args: ["inputElement", { static: false }]
            }], inputRef: [{
                type: ViewChild,
                args: ["inputRef", { static: false }]
            }], emojiButtonRef: [{
                type: ViewChild,
                args: ["emojiButtonRef", { static: false }]
            }], actionSheetRef: [{
                type: ViewChild,
                args: ["actionSheetRef", { static: false }]
            }], stickerButtonRef: [{
                type: ViewChild,
                args: ["stickerButtonRef", { static: false }]
            }], mediaRecordedRef: [{
                type: ViewChild,
                args: ["mediaRecordedRef", { static: false }]
            }], aiButtonRef: [{
                type: ViewChild,
                args: ["aiButtonRef", { static: false }]
            }], userMemberWrapperRef: [{
                type: ViewChild,
                args: ["userMemberWrapperRef", { static: false }]
            }], user: [{
                type: Input
            }], group: [{
                type: Input
            }], disableSoundForMessages: [{
                type: Input
            }], customSoundForMessage: [{
                type: Input
            }], disableTypingEvents: [{
                type: Input
            }], text: [{
                type: Input
            }], placeholderText: [{
                type: Input
            }], headerView: [{
                type: Input
            }], onTextChange: [{
                type: Input
            }], attachmentIconURL: [{
                type: Input
            }], attachmentOptions: [{
                type: Input
            }], secondaryButtonView: [{
                type: Input
            }], auxilaryButtonView: [{
                type: Input
            }], auxiliaryButtonsAlignment: [{
                type: Input
            }], sendButtonView: [{
                type: Input
            }], parentMessageId: [{
                type: Input
            }], hideLiveReaction: [{
                type: Input
            }], LiveReactionIconURL: [{
                type: Input
            }], backButtonIconURL: [{
                type: Input
            }], mentionsWarningText: [{
                type: Input
            }], mentionsWarningStyle: [{
                type: Input
            }], messageComposerStyle: [{
                type: Input
            }], onSendButtonClick: [{
                type: Input
            }], onError: [{
                type: Input
            }], backdropStyle: [{
                type: Input
            }], actionSheetStyle: [{
                type: Input
            }], aiActionSheetStyle: [{
                type: Input
            }], hideVoiceRecording: [{
                type: Input
            }], mediaRecorderStyle: [{
                type: Input
            }], aiOptionsStyle: [{
                type: Input
            }], aiIconURL: [{
                type: Input
            }], voiceRecordingIconURL: [{
                type: Input
            }], voiceRecordingCloseIconURL: [{
                type: Input
            }], voiceRecordingStartIconURL: [{
                type: Input
            }], voiceRecordingStopIconURL: [{
                type: Input
            }], voiceRecordingSubmitIconURL: [{
                type: Input
            }], childEvent: [{
                type: Output
            }], userMemberWrapperConfiguration: [{
                type: Input
            }], disableMentions: [{
                type: Input
            }], textFormatters: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhdC11aWtpdC1hbmd1bGFyL3NyYy9Db21ldENoYXRNZXNzYWdlQ29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhdC11aWtpdC1hbmd1bGFyL3NyYy9Db21ldENoYXRNZXNzYWdlQ29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsU0FBUyxFQUVULHVCQUF1QixFQUt2QixNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBS0wsa0JBQWtCLEdBRW5CLE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsT0FBTyxFQUNMLFFBQVEsRUFFUix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULHNCQUFzQixFQUN0Qix1QkFBdUIsRUFFdkIsYUFBYSxFQUNiLFVBQVUsRUFDVixpQkFBaUIsRUFFakIsTUFBTSxFQUVOLGtCQUFrQixHQUVuQixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUlqQixxQkFBcUIsRUFJckIsMEJBQTBCLEVBRTFCLGdCQUFnQixHQUVqQixNQUFNLHlCQUF5QixDQUFDO0FBRWpDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8seUJBQXlC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QjtzQkFBNUIsS0FBSztnQkFHRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBTUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQU9HLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFhRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBYUcsa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0cseUJBQXlCO3NCQUFqQyxLQUFLO2dCQUNHLDJCQUEyQjtzQkFBbkMsS0FBSztnQkFDSSxVQUFVO3NCQUFuQixNQUFNO2dCQUNFLDhCQUE4QjtzQkFBdEMsS0FBSztnQkFFRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0L2NoYXQtc2RrLWphdmFzY3JpcHRcIjtcbmltcG9ydCB7XG4gIEVtb2ppS2V5Ym9hcmRTdHlsZSxcbiAgUG9wb3ZlclN0eWxlLFxuICBBY3Rpb25TaGVldFN0eWxlLFxuICBQcmV2aWV3U3R5bGUsXG4gIE1lZGlhUmVjb3JkZXJTdHlsZSxcbiAgQmFja2Ryb3BTdHlsZSxcbn0gZnJvbSBcIkBjb21ldGNoYXQvdWlraXQtZWxlbWVudHNcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICBsb2NhbGl6ZSxcbiAgQ29tZXRDaGF0TWVzc2FnZUNvbXBvc2VyQWN0aW9uLFxuICBBdXhpbGlhcnlCdXR0b25BbGlnbm1lbnQsXG4gIFBsYWNlbWVudCxcbiAgQ29tZXRDaGF0TWVzc2FnZUV2ZW50cyxcbiAgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMsXG4gIElNZXNzYWdlcyxcbiAgTWVzc2FnZVN0YXR1cyxcbiAgZm9udEhlbHBlcixcbiAgQ29tZXRDaGF0VUlFdmVudHMsXG4gIENvbWV0Q2hhdEFjdGlvbnNWaWV3LFxuICBTdGF0ZXMsXG4gIElNZW50aW9uc0NvdW50V2FybmluZyxcbiAgVXNlck1lbWJlckxpc3RUeXBlLFxuICBNZW50aW9uc1RhcmdldEVsZW1lbnQsXG59IGZyb20gXCJAY29tZXRjaGF0L3Vpa2l0LXJlc291cmNlc1wiO1xuaW1wb3J0IHtcbiAgTWVzc2FnZUNvbXBvc2VyU3R5bGUsXG4gIENvbWV0Q2hhdFNvdW5kTWFuYWdlcixcbiAgU3RpY2tlcnNDb25zdGFudHMsXG4gIFN0aWNrZXJzQ29uZmlndXJhdGlvbixcbiAgU3RpY2tlcnNTdHlsZSxcbiAgQ3JlYXRlUG9sbFN0eWxlLFxuICBDb21ldENoYXRVSUtpdFV0aWxpdHksXG4gIENvbXBvc2VySWQsXG4gIFNtYXJ0UmVwbGllc1N0eWxlLFxuICBBSU9wdGlvbnNTdHlsZSxcbiAgQ29tZXRDaGF0TWVudGlvbnNGb3JtYXR0ZXIsXG4gIENvbWV0Q2hhdFRleHRGb3JtYXR0ZXIsXG4gIFVzZXJNZW50aW9uU3R5bGUsXG4gIFVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbixcbn0gZnJvbSBcIkBjb21ldGNoYXQvdWlraXQtc2hhcmVkXCI7XG5pbXBvcnQgeyBDb21ldENoYXRUaGVtZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vQ29tZXRDaGF0VGhlbWUuc2VydmljZVwiO1xuaW1wb3J0IHsgQ2hhdENvbmZpZ3VyYXRvciB9IGZyb20gXCIuLi8uLi9TaGFyZWQvRnJhbWV3b3JrL0NoYXRDb25maWd1cmF0b3JcIjtcbmltcG9ydCBcIkBjb21ldGNoYXQvdWlraXQtc2hhcmVkXCI7XG5pbXBvcnQgXCJAY29tZXRjaGF0L3Vpa2l0LWVsZW1lbnRzXCI7XG5pbXBvcnQgeyBDb21ldENoYXRFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vU2hhcmVkL1V0aWxzL0NvbWVDaGF0RXhjZXB0aW9uXCI7XG5cbi8qKlxuICpcbiAqIENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlciBpcyB1c2VkIHRvIHNlbmQgbWVzc2FnZSB0byB1c2VyIG9yIGdyb3VwLlxuICpcbiAqIEB2ZXJzaW9uIDEuMC4wXG4gKiBAYXV0aG9yIENvbWV0Q2hhdFRlYW1cbiAqIEBjb3B5cmlnaHQgwqkgMjAyMiBDb21ldENoYXQgSW5jLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1tZXNzYWdlLWNvbXBvc2VyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWNvbXBvc2VyLmNvbXBvbmVudC5zY3NzXCJdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TWVzc2FnZUNvbXBvc2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKFwiaW5wdXRFbGVtZW50XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dEVsZW1lbnRSZWYhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiaW5wdXRSZWZcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0UmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImVtb2ppQnV0dG9uUmVmXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBlbW9qaUJ1dHRvblJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJhY3Rpb25TaGVldFJlZlwiLCB7IHN0YXRpYzogZmFsc2UgfSkgYWN0aW9uU2hlZXRSZWYhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwic3RpY2tlckJ1dHRvblJlZlwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc3RpY2tlckJ1dHRvblJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJtZWRpYVJlY29yZGVkUmVmXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBtZWRpYVJlY29yZGVkUmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImFpQnV0dG9uUmVmXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBhaUJ1dHRvblJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJ1c2VyTWVtYmVyV3JhcHBlclJlZlwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgdXNlck1lbWJlcldyYXBwZXJSZWYhOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIHVzZXIhOiBDb21ldENoYXQuVXNlcjtcbiAgQElucHV0KCkgZ3JvdXAhOiBDb21ldENoYXQuR3JvdXA7XG4gIEBJbnB1dCgpIGRpc2FibGVTb3VuZEZvck1lc3NhZ2VzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbVNvdW5kRm9yTWVzc2FnZTogc3RyaW5nID0gXCJcIjtcbiAgQElucHV0KCkgZGlzYWJsZVR5cGluZ0V2ZW50czogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmcgPSBcIlwiO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlclRleHQ6IHN0cmluZyA9IGxvY2FsaXplKFwiRU5URVJfWU9VUl9NRVNTQUdFX0hFUkVcIik7XG5cbiAgQElucHV0KCkgaGVhZGVyVmlldyE6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIG9uVGV4dENoYW5nZSE6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIGF0dGFjaG1lbnRJY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9QbHVzLnN2Z1wiO1xuICBASW5wdXQoKSBhdHRhY2htZW50T3B0aW9uczpcbiAgICB8ICgoXG4gICAgICBpdGVtOiBDb21ldENoYXQuVXNlciB8IENvbWV0Q2hhdC5Hcm91cCxcbiAgICAgIGNvbXBvc2VySWQ6IENvbXBvc2VySWRcbiAgICApID0+IENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlckFjdGlvbltdKVxuICAgIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBzZWNvbmRhcnlCdXR0b25WaWV3ITogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgYXV4aWxhcnlCdXR0b25WaWV3ITogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgYXV4aWxpYXJ5QnV0dG9uc0FsaWdubWVudDogQXV4aWxpYXJ5QnV0dG9uQWxpZ25tZW50ID1cbiAgICBBdXhpbGlhcnlCdXR0b25BbGlnbm1lbnQucmlnaHQ7XG4gIEBJbnB1dCgpIHNlbmRCdXR0b25WaWV3ITogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgcGFyZW50TWVzc2FnZUlkOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBoaWRlTGl2ZVJlYWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgTGl2ZVJlYWN0aW9uSWNvblVSTDogc3RyaW5nID0gXCJhc3NldHMvaGVhcnQtcmVhY3Rpb24ucG5nXCI7XG4gIEBJbnB1dCgpIGJhY2tCdXR0b25JY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9iYWNrYnV0dG9uLnN2Z1wiO1xuICBASW5wdXQoKSBtZW50aW9uc1dhcm5pbmdUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBtZW50aW9uc1dhcm5pbmdTdHlsZT86IGFueTtcbiAgcHVibGljIEluZm9TaW1wbGVJY29uID0gXCJhc3NldHMvSW5mb1NpbXBsZUljb24uc3ZnXCI7XG5cbiAgQElucHV0KCkgbWVzc2FnZUNvbXBvc2VyU3R5bGU6IE1lc3NhZ2VDb21wb3NlclN0eWxlID0ge1xuICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCIsXG4gICAgbWF4SW5wdXRIZWlnaHQ6IFwiMTAwcHhcIixcbiAgfTtcbiAgQElucHV0KCkgb25TZW5kQnV0dG9uQ2xpY2s6XG4gICAgfCAoKG1lc3NhZ2U6IENvbWV0Q2hhdC5CYXNlTWVzc2FnZSkgPT4gdm9pZClcbiAgICB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgb25FcnJvcjogKChlcnJvcjogQ29tZXRDaGF0LkNvbWV0Q2hhdEV4Y2VwdGlvbikgPT4gdm9pZCkgfCBudWxsID0gKFxuICAgIGVycm9yOiBDb21ldENoYXQuQ29tZXRDaGF0RXhjZXB0aW9uXG4gICkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfTtcbiAgQElucHV0KCkgYmFja2Ryb3BTdHlsZTogQmFja2Ryb3BTdHlsZSA9IHtcbiAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwgMCwgMCwgMC41KVwiLFxuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIH07XG5cbiAgQElucHV0KCkgYWN0aW9uU2hlZXRTdHlsZTogQWN0aW9uU2hlZXRTdHlsZSA9IHtcbiAgICBsYXlvdXRNb2RlSWNvblRpbnQ6IFwicmdiYSgyMCwgMjAsIDIwLCAwLjA0KVwiLFxuICAgIGJvcmRlclJhZGl1czogXCJpbmhlcml0XCIsXG4gICAgYmFja2dyb3VuZDogXCJyZ2IoMjU1LDI1NSwyNTUpXCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICB0aXRsZUZvbnQ6IFwiNTAwIDE1cHggSW50ZXIsIHNhbnMtc2VyaWZcIixcbiAgICB0aXRsZUNvbG9yOiBcIiMxNDE0MTRcIixcbiAgICBsaXN0SXRlbUJhY2tncm91bmQ6IFwiXCIsXG4gICAgQWN0aW9uU2hlZXRTZXBhcmF0b3JUaW50OiBcIjFweCBzb2xpZCBSR0JBKDIwLCAyMCwgMjAsIDAuMDgpXCIsXG4gIH07XG5cbiAgQElucHV0KCkgYWlBY3Rpb25TaGVldFN0eWxlOiBhbnkgPSB7XG4gICAgbGF5b3V0TW9kZUljb25UaW50OiBcInJnYmEoMjAsIDIwLCAyMCwgMC4wNClcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiaW5oZXJpdFwiLFxuICAgIGJhY2tncm91bmQ6IFwicmdiKDI1NSwyNTUsMjU1KVwiLFxuICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgdGl0bGVGb250OiBcIjUwMCAxNXB4IEludGVyLCBzYW5zLXNlcmlmXCIsXG4gICAgdGl0bGVDb2xvcjogXCIjMTQxNDE0XCIsXG4gICAgbGlzdEl0ZW1CYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gICAgQWN0aW9uU2hlZXRTZXBhcmF0b3JUaW50OiBcIjFweCBzb2xpZCBSR0JBKDIwLCAyMCwgMjAsIDAuMDgpXCIsXG4gIH07XG5cbiAgQElucHV0KCkgaGlkZVZvaWNlUmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG1lZGlhUmVjb3JkZXJTdHlsZTogTWVkaWFSZWNvcmRlclN0eWxlID0ge307XG4gIEBJbnB1dCgpIGFpT3B0aW9uc1N0eWxlOiBBSU9wdGlvbnNTdHlsZSA9IHt9O1xuICBASW5wdXQoKSBhaUljb25VUkw6IHN0cmluZyA9IFwiYXNzZXRzL2FpLWJvdC5zdmdcIjtcbiAgQElucHV0KCkgdm9pY2VSZWNvcmRpbmdJY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9taWMuc3ZnXCI7XG4gIEBJbnB1dCgpIHZvaWNlUmVjb3JkaW5nQ2xvc2VJY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9jbG9zZTJ4LnN2Z1wiO1xuICBASW5wdXQoKSB2b2ljZVJlY29yZGluZ1N0YXJ0SWNvblVSTDogc3RyaW5nID0gXCJhc3NldHMvbWljLnN2Z1wiO1xuICBASW5wdXQoKSB2b2ljZVJlY29yZGluZ1N0b3BJY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9zdG9wLnN2Z1wiO1xuICBASW5wdXQoKSB2b2ljZVJlY29yZGluZ1N1Ym1pdEljb25VUkw6IHN0cmluZyA9IFwiYXNzZXRzL1NlbmQuc3ZnXCI7XG4gIEBPdXRwdXQoKSBjaGlsZEV2ZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBJbnB1dCgpIHVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbiE6IFVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbjtcbiAgcHVibGljIHVzZXJNZW1iZXJMaXN0VHlwZSE6IFVzZXJNZW1iZXJMaXN0VHlwZTtcbiAgQElucHV0KCkgZGlzYWJsZU1lbnRpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdGV4dEZvcm1hdHRlcnM/OiBBcnJheTxDb21ldENoYXRUZXh0Rm9ybWF0dGVyPiA9IFtdO1xuXG4gIHB1YmxpYyBjb21wb3NlcklkITogQ29tcG9zZXJJZDtcbiAgbWVudGlvbnNGb3JtYXR0ZXJJbnN0YW5jZUlkOiBzdHJpbmcgPSBcImNvbXBvc2VyX1wiICsgRGF0ZS5ub3coKTtcbiAgcHVibGljIGNvbXBvc2VyQWN0aW9uczogQ29tZXRDaGF0TWVzc2FnZUNvbXBvc2VyQWN0aW9uW10gPSBbXTtcbiAgcHVibGljIHN0YXRlczogdHlwZW9mIFN0YXRlcyA9IFN0YXRlcztcbiAgcHVibGljIG1lbnRpb25zU2VhcmNoVGVybTogc3RyaW5nID0gXCJcIjtcbiAgcHVibGljIHNob3dMaXN0Rm9yTWVudGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIG1lbnRpb25zU2VhcmNoQ291bnQ6IG51bWJlciA9IDE7XG4gIHB1YmxpYyBsYXN0RW1wdHlTZWFyY2hUZXJtPzogc3RyaW5nID0gXCJcIjtcblxuICBwdWJsaWMgc21hcnRSZXBseVN0YXRlOiBTdGF0ZXMgPSBTdGF0ZXMubG9hZGluZztcbiAgcHVibGljIHNob3dNZW50aW9uc0NvdW50V2FybmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ3JvdXBNZW1iZXJzUmVxdWVzdEJ1aWxkZXIhOiBDb21ldENoYXQuR3JvdXBNZW1iZXJzUmVxdWVzdEJ1aWxkZXI7XG4gIHB1YmxpYyB1c2Vyc1JlcXVlc3RCdWlsZGVyITogQ29tZXRDaGF0LlVzZXJzUmVxdWVzdEJ1aWxkZXI7XG4gIGNjU2hvd01lbnRpb25zQ291bnRXYXJuaW5nITogU3Vic2NyaXB0aW9uO1xuXG4gIGxvYWRpbmdTdGF0ZVRleHQ6IHN0cmluZyA9IGxvY2FsaXplKFwiR0VORVJBVElOR19SRVBMSUVTXCIpO1xuICBlcnJvclN0YXRlVGV4dDogc3RyaW5nID0gbG9jYWxpemUoXCJTT01FVEhJTkdfV1JPTkdcIik7XG4gIGVtcHR5U3RhdGVUZXh0OiBzdHJpbmcgPSBsb2NhbGl6ZShcIk5PX01FU1NBR0VTX0ZPVU5EXCIpO1xuICBzaG93Q3JlYXRlUG9sbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2hvd1N0aWNrZXJLZXlib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzaG93QWN0aW9uU2hlZXRJdGVtOiBib29sZWFuID0gZmFsc2U7XG4gIHNob3dBY3Rpb25TaGVldEl0ZW1BSTogYm9vbGVhbiA9IGZhbHNlO1xuICBzaG93U21hcnRSZXBseTogYm9vbGVhbiA9IGZhbHNlO1xuICBzaG93QWlGZWF0dXJlczogYm9vbGVhbiA9IGZhbHNlO1xuICByZXBsaWVzQXJyYXk6IHN0cmluZ1tdID0gW107XG4gIGFpQm90TGlzdDogQ29tZXRDaGF0LlVzZXJbXSA9IFtdO1xuICBjdXJyZW50QXNrQUlCb3Q6IGFueSA9IFwiXCI7XG4gIGlzQWlNb3JlVGhhbk9uZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHNob3dQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIGFpRmVhdHVyZXNDbG9zZUNhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgZWRpdFByZXZpZXdPYmplY3QhOiBDb21ldENoYXQuVGV4dE1lc3NhZ2U7XG4gIGNjTWVzc2FnZUVkaXQhOiBTdWJzY3JpcHRpb247XG4gIGNjQ29tcG9zZU1lc3NhZ2UhOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyB0ZXh0Rm9ybWF0dGVyTGlzdDogQXJyYXk8Q29tZXRDaGF0VGV4dEZvcm1hdHRlcj4gPSB0aGlzLnRleHRGb3JtYXR0ZXJzXG4gICAgPyBbLi4udGhpcy50ZXh0Rm9ybWF0dGVyc11cbiAgICA6IFtdO1xuICBwdWJsaWMgbWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UhOiBDb21ldENoYXRNZW50aW9uc0Zvcm1hdHRlcjtcbiAgbWVudGlvbmVkVXNlcnM6IEFycmF5PENvbWV0Q2hhdC5Vc2VyIHwgQ29tZXRDaGF0Lkdyb3VwTWVtYmVyPiA9IFtdO1xuXG4gIHB1YmxpYyBhY2NlcHRIYW5kbGVyczogYW55ID0ge1xuICAgIFwiaW1hZ2UvKlwiOiB0aGlzLm9uSW1hZ2VDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICBcInZpZGVvLypcIjogdGhpcy5vblZpZGVvQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgXCJhdWRpby8qXCI6IHRoaXMub25BdWRpb0NoYW5nZS5iaW5kKHRoaXMpLFxuICAgIFwiZmlsZS8qXCI6IHRoaXMub25GaWxlQ2hhbmdlLmJpbmQodGhpcyksXG4gIH07XG4gIHB1YmxpYyBlbmFibGVTdGlja2VyS2V5Ym9hcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHRvZ2dsZU1lZGlhUmVjb3JkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNob3dBaUJvdExpc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbWVudGlvbnNUeXBlU2V0QnlVc2VyOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzdGlja2VyQ29uZmlndXJhdGlvbjoge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIGNvbmZpZ3VyYXRpb24/OiBTdGlja2Vyc0NvbmZpZ3VyYXRpb247XG4gIH0gPSB7fTtcbiAgY2xvc2VCdXR0b25JY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9wbHVzLXJvdGF0ZWQuc3ZnXCI7XG5cbiAgYnV0dG9uczogQnV0dG9uc1tdID0gW107XG4gIGFpQWN0aW9uQnV0dG9uczogQnV0dG9uc1tdID0gW107XG5cbiAgc21hcnRSZXBseVN0eWxlOiBTbWFydFJlcGxpZXNTdHlsZSA9IHtcbiAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgaGVpZ2h0OiBcImZpdC1jb250ZW50XCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgfTtcbiAgc2VuZEJ1dHRvblN0eWxlOiBhbnkgPSB7XG4gICAgaGVpZ2h0OiBcIjI0cHhcIixcbiAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgIGJ1dHRvbkljb25UaW50OiBcInJnYmEoMjAsIDIwLCAyMCwgMC41OClcIixcbiAgICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gIH07XG4gIGxpdmVSZWFjdGlvblN0eWxlOiBhbnkgPSB7XG4gICAgaGVpZ2h0OiBcIjI0cHhcIixcbiAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgIGJ1dHRvbkljb25UaW50OiBcInJlZFwiLFxuICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICB9O1xuICBsb2NhbGl6ZTogdHlwZW9mIGxvY2FsaXplID0gbG9jYWxpemU7XG4gIGVtb2ppQnV0dG9uU3R5bGU6IGFueSA9IHtcbiAgICBoZWlnaHQ6IFwiMjRweFwiLFxuICAgIHdpZHRoOiBcIjI0cHhcIixcbiAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgIGJvcmRlclJhZGl1czogXCIwXCIsXG4gICAgYnV0dG9uSWNvblRpbnQ6IFwiZ3JleVwiLFxuICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgfTtcbiAgc3RpY2tlckJ1dHRvblN0eWxlOiBhbnkgPSB7XG4gICAgaGVpZ2h0OiBcIjI0cHhcIixcbiAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgIGJ1dHRvbkljb25UaW50OiBcImdyZXlcIixcbiAgICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gIH07XG4gIG1lZGlhUmVjb3JkZXJCdXR0b25TdHlsZTogYW55ID0ge1xuICAgIGhlaWdodDogXCIyNHB4XCIsXG4gICAgd2lkdGg6IFwiMjRweFwiLFxuICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjBcIixcbiAgICBidXR0b25JY29uVGludDogXCJncmV5XCIsXG4gICAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICB9O1xuXG4gIGVtb2ppS2V5Ym9hcmRTdHlsZTogRW1vamlLZXlib2FyZFN0eWxlID0ge1xuICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgdGV4dEZvbnQ6IHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmVtb2ppS2V5Ym9hcmRUZXh0Rm9udCxcbiAgICB0ZXh0Q29sb3I6IHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmVtb2ppS2V5Ym9hcmRUZXh0Q29sb3IsXG4gICAgYmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRCYWNrZ3JvdW5kKCksXG4gICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIixcbiAgICBhY3RpdmVJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRQcmltYXJ5KCksXG4gICAgaWNvblRpbnQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKClcbiAgfTtcblxuICBzdGlja2VyS2V5Ym9hcmRTdHlsZTogU3RpY2tlcnNTdHlsZSA9IHt9O1xuICB0ZXh0SW5wdXRTdHlsZTogYW55ID0ge307XG4gIHByZXZpZXdTdHlsZTogUHJldmlld1N0eWxlID0ge1xuICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgd2lkdGg6IFwiMTAwJVwiLFxuICB9O1xuICBjcmVhdGVQb2xsU3R5bGU6IENyZWF0ZVBvbGxTdHlsZSA9IHt9O1xuICBzdG9yZVR5cGluZ0ludGVydmFsOiBhbnk7XG4gIGVtb2ppUG9wb3ZlcjogUG9wb3ZlclN0eWxlID0ge1xuICAgIHdpZHRoOiBcIjMxNXB4XCIsXG4gICAgaGVpZ2h0OiBcIjMyMHB4XCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxuICAgIGJveFNoYWRvdzogXCIwcHggMHB4IDhweCByZ2JhKDIwLCAyMCwgMjAsIDAuMilcIixcbiAgfTtcbiAgc3RpY2tlclBvcG92ZXI6IFBvcG92ZXJTdHlsZSA9IHtcbiAgICB3aWR0aDogXCIzMDBweFwiLFxuICAgIGhlaWdodDogXCIzMjBweFwiLFxuICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcbiAgICBib3hTaGFkb3c6IFwiMHB4IDBweCA4cHggcmdiYSgyMCwgMjAsIDIwLCAwLjIpXCIsXG4gIH07XG4gIGFpUG9wb3ZlcjogUG9wb3ZlclN0eWxlID0ge1xuICAgIHdpZHRoOiBcIjI4MHB4XCIsXG4gICAgaGVpZ2h0OiBcIjI4MHB4XCIsXG5cbiAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgYm94U2hhZG93OiBcIjBweCAwcHggOHB4IHJnYmEoMjAsIDIwLCAyMCwgMC4yKVwiLFxuICB9O1xuICBtZWRpYVJlY29yZGVkUG9wb3ZlcjogUG9wb3ZlclN0eWxlID0ge1xuICAgIHdpZHRoOiBcIjI1MHB4XCIsXG4gICAgaGVpZ2h0OiBcIjEwMHB4XCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxuICAgIGJveFNoYWRvdzogXCIwcHggMHB4IDhweCByZ2JhKDIwLCAyMCwgMjAsIDAuMilcIixcbiAgfTtcbiAgcG9wb3ZlclN0eWxlOiBQb3BvdmVyU3R5bGUgPSB7XG4gICAgd2lkdGg6IFwiMjc1cHhcIixcbiAgICBoZWlnaHQ6IFwiMjgwcHhcIixcbiAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgYm94U2hhZG93OiBcIjBweCAwcHggOHB4IHJnYmEoMjAsIDIwLCAyMCwgMC4yKVwiLFxuICB9O1xuICBzZW5kQnV0dG9uSWNvblVSTDogc3RyaW5nID0gXCJhc3NldHMvU2VuZC5zdmdcIjtcbiAgZW1vamlCdXR0b25JY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9TdGlwb3Auc3ZnXCI7XG4gIHN0aWNrZXJCdXR0b25JY29uVVJMOiBzdHJpbmcgPSBcImFzc2V0cy9TdGlja2Vycy5zdmdcIjtcblxuICBhY3Rpb25zITogKENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlckFjdGlvbiB8IENvbWV0Q2hhdEFjdGlvbnNWaWV3KVtdO1xuICBtZXNzYWdlVGV4dDogc3RyaW5nID0gXCJcIjtcbiAgYXR0YWNobWVudEJ1dHRvblN0eWxlOiBhbnkgPSB7XG4gICAgaGVpZ2h0OiBcIjI0cHhcIixcbiAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgIGJ1dHRvbkljb25UaW50OiBcImdyZXlcIixcbiAgICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gIH07XG4gIGF1eGlsYXJ5UGxhY2VtZW50OiBQbGFjZW1lbnQgPSBQbGFjZW1lbnQudG9wO1xuICBtZXNzYWdlU2VuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBtZXNzYWdlVG9CZUVkaXRlZCE6IENvbWV0Q2hhdC5UZXh0TWVzc2FnZSB8IG51bGw7XG4gIHB1YmxpYyBlZGl0UHJldmlld1RleHQ6IHN0cmluZyB8IG51bGwgPSBcIlwiO1xuICBzaG93U2VuZEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBzaG93RW1vamlLZXlib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0FpRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzbWFydFJlcGxpZXM6IHN0cmluZ1tdID0gW107XG4gIGxvZ2dlZEluVXNlciE6IENvbWV0Q2hhdC5Vc2VyIHwgbnVsbDtcbiAgbWVudGlvblN0eWxlTG9jYWw6IFVzZXJNZW50aW9uU3R5bGUgPSBuZXcgVXNlck1lbnRpb25TdHlsZSh7fSk7XG5cbiAgc2VuZE1lc3NhZ2VPbkVudGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICB0aGlzLnNob3dNZW50aW9uc0NvdW50V2FybmluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0xpc3RGb3JNZW50aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuc2VuZFRleHRNZXNzYWdlKGV2ZW50LmRldGFpbC52YWx1ZSk7XG4gICAgdGhpcy5pbnB1dFJlZj8ubmF0aXZlRWxlbWVudD8uZW1wdHlJbnB1dEZpZWxkKCk7XG4gICAgdGhpcy5zaG93U2VuZEJ1dHRvbiA9IGZhbHNlO1xuICAgIHRoaXMuZGlzYWJsZVNlbmRCdXR0b24oKVxuICB9O1xuICBkaXNhYmxlU2VuZEJ1dHRvbigpIHtcbiAgICB0aGlzLnNlbmRCdXR0b25TdHlsZSA9IHtcbiAgICAgIGhlaWdodDogXCIyNHB4XCIsXG4gICAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjBcIixcbiAgICAgIGJ1dHRvbkljb25UaW50OiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDIwMCgpLFxuICAgICAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICAgIH07XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG4gIG1lc3NhZ2VJbnB1dENoYW5nZWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBldmVudD8uZGV0YWlsPy52YWx1ZT8udHJpbSgpO1xuICAgIHRoaXMuc2VuZEJ1dHRvblN0eWxlID0ge1xuICAgICAgaGVpZ2h0OiBcIjI0cHhcIixcbiAgICAgIHdpZHRoOiBcIjI0cHhcIixcbiAgICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgICAgYnV0dG9uSWNvblRpbnQ6IHRleHRcbiAgICAgICAgPyB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5zZW5kSWNvblRpbnRcbiAgICAgICAgOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDIwMCgpLFxuICAgICAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICAgIH07XG4gICAgdGhpcy5zaG93U2VuZEJ1dHRvbiA9IHRydWU7XG4gICAgaWYgKHRoaXMub25UZXh0Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVGV4dENoYW5nZSh0ZXh0KTtcbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlVGV4dCA9IHRleHQ7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRoaXMuc3RhcnRUeXBpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmRUeXBpbmcoKTtcbiAgICB9XG4gIH07XG4gIGFwcGVuZEVtb2ppID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBpZiAodGhpcy50ZXh0ID09PSBldmVudD8uZGV0YWlsLmlkKSB7XG4gICAgICB0aGlzLnRleHQgPSBcIlwiICsgXCJcIjtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgdGhpcy50ZXh0ID0gZXZlbnQ/LmRldGFpbC5pZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG4gIHNlbmRSZWFjdGlvbigpIHtcbiAgICBsZXQgcmVjZWl2ZXJJZDogc3RyaW5nID0gdGhpcy51c2VyXG4gICAgICA/IHRoaXMudXNlcj8uZ2V0VWlkKCkhXG4gICAgICA6IHRoaXMuZ3JvdXA/LmdldEd1aWQoKSE7XG4gICAgbGV0IHJlY2VpdmVyVHlwZSA9IHRoaXMudXNlclxuICAgICAgPyBDb21ldENoYXRVSUtpdENvbnN0YW50cy5NZXNzYWdlUmVjZWl2ZXJUeXBlLnVzZXJcbiAgICAgIDogQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVJlY2VpdmVyVHlwZS5ncm91cDtcbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIHR5cGU6IFwibGl2ZV9yZWFjdGlvblwiLFxuICAgICAgcmVhY3Rpb246IFwiaGVhcnRcIixcbiAgICB9O1xuICAgIGxldCB0cmFuc2llbnRNZXNzYWdlID0gbmV3IENvbWV0Q2hhdC5UcmFuc2llbnRNZXNzYWdlKFxuICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgIHJlY2VpdmVyVHlwZSxcbiAgICAgIGRhdGFcbiAgICApO1xuICAgIENvbWV0Q2hhdC5zZW5kVHJhbnNpZW50TWVzc2FnZSh0cmFuc2llbnRNZXNzYWdlKTtcbiAgICBDb21ldENoYXRNZXNzYWdlRXZlbnRzLmNjTGl2ZVJlYWN0aW9uLm5leHQoXCJoZWFydFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBvcGVuQ3JlYXRlUG9sbHMgPSAoKSA9PiB7XG4gICAgdGhpcy5zaG93Q3JlYXRlUG9sbHMgPSB0cnVlO1xuICAgIGlmICh0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aW9uU2hlZXRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtID0gIXRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbTtcbiAgICB9XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuICBjbG9zZUNyZWF0ZVBvbGxzID0gKCkgPT4ge1xuICAgIHRoaXMuc2hvd0NyZWF0ZVBvbGxzID0gZmFsc2U7XG5cbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG4gIHNlbmRSZWNvcmRlZE1lZGlhID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBsZXQgZmlsZSA9IGV2ZW50Py5kZXRhaWw/LmZpbGU7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRoaXMuc2VuZFJlY29yZGVkQXVkaW8oZmlsZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VNZWRpYVJlY29yZGVyKCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuICBjbG9zZU1lZGlhUmVjb3JkZXIoZXZlbnQ/OiBhbnkpIHtcbiAgICBpZiAodGhpcy50b2dnbGVNZWRpYVJlY29yZGVkKSB7XG4gICAgICB0aGlzLm1lZGlhUmVjb3JkZWRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy50b2dnbGVNZWRpYVJlY29yZGVkID0gIXRoaXMudG9nZ2xlTWVkaWFSZWNvcmRlZDtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0Rm9ybWF0dGVkRGF0ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IHllYXIgPSBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgbW9udGggPSB0aGlzLnBhZFplcm8oY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEpO1xuICAgIGNvbnN0IGRheSA9IHRoaXMucGFkWmVybyhjdXJyZW50RGF0ZS5nZXREYXRlKCkpO1xuICAgIGNvbnN0IGhvdXJzID0gdGhpcy5wYWRaZXJvKGN1cnJlbnREYXRlLmdldEhvdXJzKCkpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSB0aGlzLnBhZFplcm8oY3VycmVudERhdGUuZ2V0TWludXRlcygpKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGhpcy5wYWRaZXJvKGN1cnJlbnREYXRlLmdldFNlY29uZHMoKSk7XG5cbiAgICByZXR1cm4gYCR7eWVhcn0ke21vbnRofSR7ZGF5fSR7aG91cnN9JHttaW51dGVzfSR7c2Vjb25kc31gO1xuICB9XG5cbiAgcGFkWmVybyhudW06IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgfVxuXG4gIHNlbmRSZWNvcmRlZEF1ZGlvID0gKGZpbGU6IEJsb2IpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXBsb2FkZWRGaWxlID0gZmlsZTtcbiAgICAgIGNvbnN0IHJlYWRlcjogYW55ID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImxvYWRcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICAgIFtyZWFkZXIucmVzdWx0XSxcbiAgICAgICAgICAgIGBhdWRpby1yZWNvcmRpbmctJHt0aGlzLmdldEZvcm1hdHRlZERhdGUoKX0ud2F2YCxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZW5kTWVkaWFNZXNzYWdlKFxuICAgICAgICAgICAgbmV3RmlsZSxcbiAgICAgICAgICAgIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy5hdWRpb1xuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHVwbG9hZGVkRmlsZSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgaWYgKHRoaXMub25FcnJvcikge1xuICAgICAgICB0aGlzLm9uRXJyb3IoQ29tZXRDaGF0RXhjZXB0aW9uKGVycm9yKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBhZGRBdHRhY2htZW50Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb3NlckFjdGlvbnM/LmZvckVhY2goKGVsZW1lbnQ6IENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlckFjdGlvbikgPT4ge1xuICAgICAgc3dpdGNoIChlbGVtZW50LmlkKSB7XG4gICAgICAgIGNhc2UgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVR5cGVzLmF1ZGlvOlxuICAgICAgICAgIGVsZW1lbnQub25DbGljayA9IHRoaXMub3BlbkF1ZGlvUGlja2VyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy52aWRlbzpcbiAgICAgICAgICBlbGVtZW50Lm9uQ2xpY2sgPSB0aGlzLm9wZW52aWRlb1BpY2tlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb21ldENoYXRVSUtpdENvbnN0YW50cy5NZXNzYWdlVHlwZXMuZmlsZTpcbiAgICAgICAgICBlbGVtZW50Lm9uQ2xpY2sgPSB0aGlzLm9wZW5GaWxlUGlja2VyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy5pbWFnZTpcbiAgICAgICAgICBlbGVtZW50Lm9uQ2xpY2sgPSB0aGlzLm9wZW5JbWFnZVBpY2tlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImV4dGVuc2lvbl9wb2xsXCI6XG4gICAgICAgICAgZWxlbWVudC5vbkNsaWNrID0gdGhpcy5vcGVuQ3JlYXRlUG9sbHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdWJzY3JpYmVUb0V2ZW50cygpIHtcbiAgICB0aGlzLmNjTWVzc2FnZUVkaXQgPSBDb21ldENoYXRNZXNzYWdlRXZlbnRzLmNjTWVzc2FnZUVkaXRlZC5zdWJzY3JpYmUoXG4gICAgICAob2JqZWN0OiBJTWVzc2FnZXMpID0+IHtcbiAgICAgICAgbGV0IHBhcmVudElkID0gb2JqZWN0Py5tZXNzYWdlPy5nZXRQYXJlbnRNZXNzYWdlSWQoKVxuICAgICAgICBpZiAoKHRoaXMucGFyZW50TWVzc2FnZUlkICYmIHBhcmVudElkICYmIHBhcmVudElkID09IHRoaXMucGFyZW50TWVzc2FnZUlkKSB8fCAoIXRoaXMucGFyZW50TWVzc2FnZUlkICYmICFwYXJlbnRJZCkpIHtcbiAgICAgICAgICBpZiAob2JqZWN0Py5zdGF0dXMgPT0gTWVzc2FnZVN0YXR1cy5pbnByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gb2JqZWN0Lm1lc3NhZ2UgYXMgQ29tZXRDaGF0LlRleHRNZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5vcGVuRWRpdFByZXZpZXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuY2NDb21wb3NlTWVzc2FnZSA9IENvbWV0Q2hhdFVJRXZlbnRzLmNjQ29tcG9zZU1lc3NhZ2Uuc3Vic2NyaWJlKFxuICAgICAgKHRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmNjU2hvd01lbnRpb25zQ291bnRXYXJuaW5nID1cbiAgICAgIENvbWV0Q2hhdFVJRXZlbnRzLmNjU2hvd01lbnRpb25zQ291bnRXYXJuaW5nLnN1YnNjcmliZShcbiAgICAgICAgKGRhdGE6IElNZW50aW9uc0NvdW50V2FybmluZykgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLmlkID09IHRoaXMubWVudGlvbnNGb3JtYXR0ZXJJbnN0YW5jZUlkKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zaG93V2FybmluZykge1xuICAgICAgICAgICAgICB0aGlzLnNob3dNZW50aW9uc0NvdW50V2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hvd01lbnRpb25zQ291bnRXYXJuaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICB9XG4gIG9wZW5FZGl0UHJldmlldygpIHtcbiAgICBsZXQgbWVzc2FnZVRleHRXaXRoTWVudGlvblRhZ3MgPSB0aGlzLmNoZWNrRm9yTWVudGlvbnMoXG4gICAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkIVxuICAgICk7XG4gICAgdGhpcy50ZXh0ID0gXCJcIjtcbiAgICB0aGlzLmlucHV0UmVmPy5uYXRpdmVFbGVtZW50Py5lbXB0eUlucHV0RmllbGQoKTtcbiAgICB0aGlzLnRleHQgPSB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkIS5nZXRUZXh0KCk7XG4gICAgdGhpcy5lZGl0UHJldmlld1RleHQgPSBtZXNzYWdlVGV4dFdpdGhNZW50aW9uVGFncztcbiAgICB0aGlzLnNob3dQcmV2aWV3ID0gdHJ1ZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBAIGZvciBldmVyeSBtZW50aW9uIHRoZSBtZXNzYWdlIGJ5IG1hdGNoaW5nIHVpZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgKiBAcmV0dXJucyAge3ZvaWR9XG4gICAqL1xuICBjaGVja0Zvck1lbnRpb25zKG1lc3NhZ2U6IENvbWV0Q2hhdC5UZXh0TWVzc2FnZSkge1xuICAgIGNvbnN0IHJlZ2V4ID0gLzxAdWlkOiguKj8pPi9nO1xuICAgIGxldCBtZXNzYWdlVGV4dCA9IG1lc3NhZ2UuZ2V0VGV4dCgpO1xuICAgIGxldCBtZXNzYWdlVGV4dFRtcCA9IG1lc3NhZ2VUZXh0O1xuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobWVzc2FnZVRleHQpO1xuICAgIGxldCBtZW50aW9uZWRVc2VycyA9IG1lc3NhZ2UuZ2V0TWVudGlvbmVkVXNlcnMoKTtcbiAgICBsZXQgY29tZXRDaGF0VXNlcnNHcm91cE1lbWJlcnMgPSBbXTtcbiAgICB3aGlsZSAobWF0Y2ggIT09IG51bGwpIHtcbiAgICAgIGxldCB1c2VyO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW50aW9uZWRVc2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWF0Y2hbMV0gPT0gbWVudGlvbmVkVXNlcnNbaV0uZ2V0VWlkKCkpIHtcbiAgICAgICAgICB1c2VyID0gbWVudGlvbmVkVXNlcnNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIG1lc3NhZ2VUZXh0VG1wID0gbWVzc2FnZVRleHRUbXAucmVwbGFjZShtYXRjaFswXSwgXCJAXCIgKyB1c2VyLmdldE5hbWUoKSk7XG4gICAgICAgIGNvbWV0Q2hhdFVzZXJzR3JvdXBNZW1iZXJzLnB1c2godXNlcik7XG4gICAgICB9XG4gICAgICBtYXRjaCA9IHJlZ2V4LmV4ZWMobWVzc2FnZVRleHQpO1xuICAgIH1cbiAgICB0aGlzLm1lbnRpb25zVGV4dEZvcm1hdHRlckluc3RhbmNlLnNldENvbWV0Q2hhdFVzZXJHcm91cE1lbWJlcnMoXG4gICAgICBjb21ldENoYXRVc2Vyc0dyb3VwTWVtYmVyc1xuICAgICk7XG4gICAgdGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZS5zZXRMb2dnZWRJblVzZXIodGhpcy5sb2dnZWRJblVzZXIhKTtcbiAgICByZXR1cm4gbWVzc2FnZVRleHRUbXA7XG4gIH1cblxuICB1bnN1YnNjcmliZVRvRXZlbnRzKCkge1xuICAgIHRoaXMuY2NNZXNzYWdlRWRpdD8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNjU2hvd01lbnRpb25zQ291bnRXYXJuaW5nPy51bnN1YnNjcmliZSgpO1xuICB9XG4gIGNsb3NlTW9kYWxzKCkge1xuICAgIGlmICh0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aW9uU2hlZXRSZWY/Lm5hdGl2ZUVsZW1lbnQ/LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuZW1vamlCdXR0b25SZWY/Lm5hdGl2ZUVsZW1lbnQ/LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dFbW9qaUtleWJvYXJkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dTdGlja2VyS2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuc3RpY2tlckJ1dHRvblJlZj8ubmF0aXZlRWxlbWVudD8uY2xpY2soKTtcbiAgICAgIHRoaXMuc2hvd1N0aWNrZXJLZXlib2FyZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy50b2dnbGVNZWRpYVJlY29yZGVkKSB7XG4gICAgICB0aGlzLm1lZGlhUmVjb3JkZWRSZWY/Lm5hdGl2ZUVsZW1lbnQ/LmNsaWNrKCk7XG4gICAgICB0aGlzLnRvZ2dsZU1lZGlhUmVjb3JkZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvd0FpRmVhdHVyZXMpIHtcbiAgICAgIHRoaXMuYWlCdXR0b25SZWY/Lm5hdGl2ZUVsZW1lbnQ/LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBaUZlYXR1cmVzID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dBaUJvdExpc3QgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGhlbWVTZXJ2aWNlOiBDb21ldENoYXRUaGVtZVNlcnZpY2VcbiAgKSB7IH1cblxuICBjYWxsQ29udmVyc2F0aW9uU3VtbWFyeU1ldGhvZCgpIHtcbiAgICB0aGlzLnNob3dBaUZlYXR1cmVzID0gZmFsc2U7XG4gICAgdGhpcy5haUJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG5cbiAgICBDb21ldENoYXRVSUV2ZW50cy5jY1Nob3dQYW5lbC5uZXh0KHtcbiAgICAgIGNoaWxkOiB7IHNob3dDb252ZXJzYXRpb25TdW1tYXJ5VmlldzogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1tcInVzZXJcIl0gfHwgY2hhbmdlc1tcImdyb3VwXCJdKSB7XG4gICAgICB0aGlzLnVzZXJPckdyb3VwQ2hhbmdlZChjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICB1c2VyT3JHcm91cENoYW5nZWQoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlTWVudGlvbnMpIHtcbiAgICAgIHRoaXMuc2hvd0xpc3RGb3JNZW50aW9ucyA9IGZhbHNlO1xuICAgICAgaWYgKGNoYW5nZXNbXCJncm91cFwiXSAmJiB0aGlzLmdyb3VwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbi51c2VyTWVtYmVyTGlzdFR5cGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXNlck1lbWJlckxpc3RUeXBlID0gVXNlck1lbWJlckxpc3RUeXBlLmdyb3VwbWVtYmVycztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwTWVtYmVyc1JlcXVlc3RCdWlsZGVyID0gdGhpcy51c2VyTWVtYmVyV3JhcHBlckNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAuZ3JvdXBNZW1iZXJSZXF1ZXN0QnVpbGRlclxuICAgICAgICAgID8gdGhpcy51c2VyTWVtYmVyV3JhcHBlckNvbmZpZ3VyYXRpb24uZ3JvdXBNZW1iZXJSZXF1ZXN0QnVpbGRlclxuICAgICAgICAgIDogbmV3IENvbWV0Q2hhdC5Hcm91cE1lbWJlcnNSZXF1ZXN0QnVpbGRlcihcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAuZ2V0R3VpZCgpXG4gICAgICAgICAgKS5zZXRMaW1pdCgxNSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlc1tcInVzZXJcIl0gJiYgdGhpcy51c2VyKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbi51c2VyTWVtYmVyTGlzdFR5cGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXNlck1lbWJlckxpc3RUeXBlID0gVXNlck1lbWJlckxpc3RUeXBlLnVzZXJzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlcnNSZXF1ZXN0QnVpbGRlciA9IHRoaXMudXNlck1lbWJlcldyYXBwZXJDb25maWd1cmF0aW9uXG4gICAgICAgICAgLnVzZXJzUmVxdWVzdEJ1aWxkZXJcbiAgICAgICAgICA/IHRoaXMudXNlck1lbWJlcldyYXBwZXJDb25maWd1cmF0aW9uLnVzZXJzUmVxdWVzdEJ1aWxkZXJcbiAgICAgICAgICA6IG5ldyBDb21ldENoYXQuVXNlcnNSZXF1ZXN0QnVpbGRlcigpLnNldExpbWl0KDE1KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaG93QWlCb3RMaXN0ID0gZmFsc2U7XG4gICAgdGhpcy5zaG93U21hcnRSZXBseSA9IGZhbHNlO1xuICAgIHRoaXMuY2xvc2VNb2RhbHMoKTtcbiAgICB0aGlzLm1lc3NhZ2VUZXh0ID0gXCJcIjtcbiAgICB0aGlzLmlucHV0UmVmPy5uYXRpdmVFbGVtZW50Py5lbXB0eUlucHV0RmllbGQoKTtcblxuICAgIHRoaXMuc2hvd1NlbmRCdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgIHRoaXMuY29tcG9zZXJJZCA9IHRoaXMuZ2V0Q29tcG9zZXJJZCgpO1xuICAgIGlmICh0aGlzLmF0dGFjaG1lbnRPcHRpb25zKSB7XG4gICAgICB0aGlzLmNvbXBvc2VyQWN0aW9ucyA9IHRoaXMuYXR0YWNobWVudE9wdGlvbnMoXG4gICAgICAgIHRoaXMudXNlciB8fCB0aGlzLmdyb3VwLFxuICAgICAgICB0aGlzLmNvbXBvc2VySWRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcG9zZXJBY3Rpb25zID1cbiAgICAgICAgQ2hhdENvbmZpZ3VyYXRvci5nZXREYXRhU291cmNlKCk/LmdldEF0dGFjaG1lbnRPcHRpb25zKFxuICAgICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLFxuICAgICAgICAgIHRoaXMudXNlcixcbiAgICAgICAgICB0aGlzLmdyb3VwLFxuICAgICAgICAgIHRoaXMuY29tcG9zZXJJZFxuICAgICAgICApO1xuICAgICAgdGhpcy5hZGRBdHRhY2htZW50Q2FsbGJhY2soKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRleHRGb3JtYXR0ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnRleHRGb3JtYXR0ZXJMaXN0W2ldLnNldENvbXBvc2VyQ29uZmlnKHRoaXMudXNlciwgdGhpcy5ncm91cCwgdGhpcy5jb21wb3NlcklkKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB0aGlzLm1lbnRpb25zVGV4dEZvcm1hdHRlckluc3RhbmNlLmNsZWFudXAoKTtcbiAgfVxuXG4gIGN1c3RvbVNlbmRNZXRob2QobWVzc2FnZTogU3RyaW5nKSB7XG4gICAgdGhpcy5zaG93U2VuZEJ1dHRvbiA9IGZhbHNlO1xuICAgIHRoaXMuc2VuZFRleHRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGlzYWJsZVNlbmRCdXR0b24oKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSAge1N0cmluZz1cIlwifSB0ZXh0TXNnXG4gICAqL1xuICBzZW5kVGV4dE1lc3NhZ2UodGV4dE1zZzogU3RyaW5nID0gXCJcIik6IGJvb2xlYW4ge1xuICAgIHRoaXMuZW5kVHlwaW5nKCk7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERvbnQgU2VuZCBCbGFuayB0ZXh0IG1lc3NhZ2VzIC0tIGkuZSAtLS0gbWVzc2FnZXMgdGhhdCBvbmx5IGNvbnRhaW4gc3BhY2VzXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMubWVzc2FnZVRleHQ/LnRyaW0oKT8ubGVuZ3RoID09IDAgJiZcbiAgICAgICAgdGV4dE1zZz8udHJpbSgpPy5sZW5ndGggPT0gMFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHdhaXQgZm9yIHRoZSBwcmV2aW91cyBtZXNzYWdlIHRvIGJlIHNlbnQgYmVmb3JlIHNlbmRpbmcgdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgICAgaWYgKHRoaXMubWVzc2FnZVNlbmRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IHRydWU7XG4gICAgICAvLyBJZiBpdHMgYW4gRWRpdCBhbmQgU2VuZCBNZXNzYWdlIE9wZXJhdGlvbiAsIHVzZSBFZGl0IE1lc3NhZ2UgRnVuY3Rpb25cbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkKSB7XG4gICAgICAgIHRoaXMuZWRpdE1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBsZXQgeyByZWNlaXZlcklkLCByZWNlaXZlclR5cGUgfSA9IHRoaXMuZ2V0UmVjZWl2ZXJEZXRhaWxzKCk7XG4gICAgICBsZXQgbWVzc2FnZUlucHV0O1xuICAgICAgaWYgKHRleHRNc2cgIT09IG51bGwpIHtcbiAgICAgICAgbWVzc2FnZUlucHV0ID0gdGV4dE1zZy50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlSW5wdXQgPSB0aGlzLm1lc3NhZ2VUZXh0LnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIGxldCB0ZXh0TWVzc2FnZTogQ29tZXRDaGF0LlRleHRNZXNzYWdlID0gbmV3IENvbWV0Q2hhdC5UZXh0TWVzc2FnZShcbiAgICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgICAgbWVzc2FnZUlucHV0LFxuICAgICAgICByZWNlaXZlclR5cGVcbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgICAgdGV4dE1lc3NhZ2Uuc2V0UGFyZW50TWVzc2FnZUlkKHRoaXMucGFyZW50TWVzc2FnZUlkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWVudGlvbmVkVXNlcnMubGVuZ3RoKSB7XG4gICAgICAgIGxldCB1c2VyT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWVudGlvbmVkVXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB1c2VyT2JqZWN0cy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5tZW50aW9uZWRVc2Vyc1tpXSBpbnN0YW5jZW9mIENvbWV0Q2hhdC5Hcm91cE1lbWJlclxuICAgICAgICAgICAgICA/ICh0aGlzLm1lbnRpb25lZFVzZXJzW2ldIGFzIENvbWV0Q2hhdC5Vc2VyKVxuICAgICAgICAgICAgICA6IHRoaXMubWVudGlvbmVkVXNlcnNbaV1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRleHRNZXNzYWdlLnNldE1lbnRpb25lZFVzZXJzKHVzZXJPYmplY3RzKTtcbiAgICAgICAgdGhpcy5tZW50aW9uZWRVc2VycyA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0ZXh0TWVzc2FnZS5zZXRTZW50QXQoQ29tZXRDaGF0VUlLaXRVdGlsaXR5LmdldFVuaXhUaW1lc3RhbXAoKSk7XG4gICAgICB0ZXh0TWVzc2FnZS5zZXRNdWlkKENvbWV0Q2hhdFVJS2l0VXRpbGl0eS5JRCgpKTtcbiAgICAgIHRoaXMuc2hvd01lbnRpb25zQ291bnRXYXJuaW5nID0gZmFsc2U7XG5cbiAgICAgIC8vIHBsYXkgYXVkaW8gYWZ0ZXIgYWN0aW9uIGdlbmVyYXRpb25cbiAgICAgIGlmICghdGhpcy5kaXNhYmxlU291bmRGb3JNZXNzYWdlcykge1xuICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgfVxuICAgICAgLy9jbGVhcmluZyBNZXNzYWdlIElucHV0IEJveFxuICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IFwiXCI7XG4gICAgICB0aGlzLmlucHV0UmVmPy5uYXRpdmVFbGVtZW50Py5lbXB0eUlucHV0RmllbGQoKTtcbiAgICAgIHRoaXMudGV4dCA9IFwiXCI7XG4gICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGV4dEZvcm1hdHRlckxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGV4dE1lc3NhZ2UgPSAodGhpcy50ZXh0Rm9ybWF0dGVyTGlzdFtpXS5mb3JtYXRNZXNzYWdlRm9yU2VuZGluZyh0ZXh0TWVzc2FnZSkgYXMgQ29tZXRDaGF0LlRleHRNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIC8vIEVuZCBUeXBpbmcgSW5kaWNhdG9yIEZ1bmN0aW9uXG4gICAgICB0aGlzLmNsb3NlUG9wb3ZlcnMoKTtcbiAgICAgIGlmICghdGhpcy5vblNlbmRCdXR0b25DbGljaykge1xuICAgICAgICBDb21ldENoYXRNZXNzYWdlRXZlbnRzLmNjTWVzc2FnZVNlbnQubmV4dCh7XG4gICAgICAgICAgbWVzc2FnZTogdGV4dE1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzOiBNZXNzYWdlU3RhdHVzLmlucHJvZ3Jlc3MsXG4gICAgICAgIH0pO1xuICAgICAgICBDb21ldENoYXQuc2VuZE1lc3NhZ2UodGV4dE1lc3NhZ2UpXG4gICAgICAgICAgLnRoZW4oKG1lc3NhZ2U6IENvbWV0Q2hhdC5UZXh0TWVzc2FnZSB8IENvbWV0Q2hhdC5CYXNlTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VPYmplY3Q6IENvbWV0Q2hhdC5CYXNlTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICBDb21ldENoYXRNZXNzYWdlRXZlbnRzLmNjTWVzc2FnZVNlbnQubmV4dCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VPYmplY3QsXG4gICAgICAgICAgICAgIHN0YXR1czogTWVzc2FnZVN0YXR1cy5zdWNjZXNzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIHNlbmQgYnV0dG9uIHRvIHJlYWN0aW9uIGJ1dHRvblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd1NlbmRCdXR0b24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UucmVzZXRDb21ldENoYXRVc2VyR3JvdXBNZW1iZXJzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBDb21ldENoYXQuQ29tZXRDaGF0RXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgICB0ZXh0TWVzc2FnZS5zZXRNZXRhZGF0YSh7XG4gICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBDb21ldENoYXRNZXNzYWdlRXZlbnRzLmNjTWVzc2FnZVNlbnQubmV4dCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IHRleHRNZXNzYWdlLFxuICAgICAgICAgICAgICBzdGF0dXM6IE1lc3NhZ2VTdGF0dXMuZXJyb3IsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25TZW5kQnV0dG9uQ2xpY2sodGV4dE1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5vbkVycm9yKENvbWV0Q2hhdEV4Y2VwdGlvbihlcnJvcikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQWlCYWNrQnV0dG9uQ2xpY2soKSB7XG4gICAgdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtQUkgPSB0cnVlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGVkaXRNZXNzYWdlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlVG9CZUVkaXRlZDogYW55ID0gdGhpcy5tZXNzYWdlVG9CZUVkaXRlZDtcbiAgICAgIGxldCB7IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSB9ID0gdGhpcy5nZXRSZWNlaXZlckRldGFpbHMoKTtcbiAgICAgIGxldCBtZXNzYWdlVGV4dCA9IHRoaXMubWVzc2FnZVRleHQudHJpbSgpO1xuICAgICAgbGV0IG1lbnRpb25lZFVzZXJzID0gW107XG4gICAgICBpZiAobWVzc2FnZVRvQmVFZGl0ZWQuZ2V0TWVudGlvbmVkVXNlcnMoKSkge1xuICAgICAgICBtZW50aW9uZWRVc2VycyA9IG1lc3NhZ2VUb0JlRWRpdGVkLmdldE1lbnRpb25lZFVzZXJzKCk7XG4gICAgICAgIG1lc3NhZ2VUZXh0ID1cbiAgICAgICAgICB0aGlzLm1lbnRpb25zVGV4dEZvcm1hdHRlckluc3RhbmNlLmdldE9yaWdpbmFsVGV4dChtZXNzYWdlVGV4dCk7XG4gICAgICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2Uuc2V0Q29tZXRDaGF0VXNlckdyb3VwTWVtYmVycyhcbiAgICAgICAgICBtZW50aW9uZWRVc2Vyc1xuICAgICAgICApO1xuICAgICAgICBtZXNzYWdlVGV4dCA9XG4gICAgICAgICAgdGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZS5nZXRPcmlnaW5hbFRleHQobWVzc2FnZVRleHQpO1xuICAgICAgfVxuICAgICAgbGV0IHRleHRNZXNzYWdlOiBDb21ldENoYXQuVGV4dE1lc3NhZ2UgPSBuZXcgQ29tZXRDaGF0LlRleHRNZXNzYWdlKFxuICAgICAgICByZWNlaXZlcklkLFxuICAgICAgICBtZXNzYWdlVGV4dCxcbiAgICAgICAgcmVjZWl2ZXJUeXBlXG4gICAgICApO1xuICAgICAgaWYgKG1lbnRpb25lZFVzZXJzLmxlbmd0aCkge1xuICAgICAgICB0ZXh0TWVzc2FnZS5zZXRNZW50aW9uZWRVc2VycyhtZW50aW9uZWRVc2Vycyk7XG4gICAgICB9XG4gICAgICB0ZXh0TWVzc2FnZS5zZXRJZChtZXNzYWdlVG9CZUVkaXRlZC5pZCk7XG4gICAgICB0aGlzLmNsb3NlUHJldmlldygpO1xuICAgICAgdGhpcy5lbmRUeXBpbmcoKTtcbiAgICAgIHRoaXMuaW5wdXRSZWY/Lm5hdGl2ZUVsZW1lbnQ/LmVtcHR5SW5wdXRGaWVsZCgpO1xuICAgICAgdGhpcy5zaG93TWVudGlvbnNDb3VudFdhcm5pbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMubWVzc2FnZVRvQmVFZGl0ZWQgPSBudWxsO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRleHRGb3JtYXR0ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRleHRNZXNzYWdlID0gKHRoaXMudGV4dEZvcm1hdHRlckxpc3RbaV0uZm9ybWF0TWVzc2FnZUZvclNlbmRpbmcodGV4dE1lc3NhZ2UpIGFzIENvbWV0Q2hhdC5UZXh0TWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBDb21ldENoYXQuZWRpdE1lc3NhZ2UodGV4dE1lc3NhZ2UpXG4gICAgICAgIC50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgIENvbWV0Q2hhdE1lc3NhZ2VFdmVudHMuY2NNZXNzYWdlRWRpdGVkLm5leHQoe1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHN0YXR1czogTWVzc2FnZVN0YXR1cy5zdWNjZXNzLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UucmVzZXRDb21ldENoYXRVc2VyR3JvdXBNZW1iZXJzKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHRoaXMub25FcnJvcikge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5vbkVycm9yKENvbWV0Q2hhdEV4Y2VwdGlvbihlcnJvcikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRSZWNlaXZlckRldGFpbHMoKSB7XG4gICAgbGV0IHJlY2VpdmVySWQhOiBzdHJpbmc7XG4gICAgbGV0IHJlY2VpdmVyVHlwZSE6IHN0cmluZztcbiAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci5nZXRVaWQoKSkge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMudXNlci5nZXRVaWQoKTtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VSZWNlaXZlclR5cGUudXNlcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ3JvdXAgJiYgdGhpcy5ncm91cC5nZXRHdWlkKCkpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLmdyb3VwLmdldEd1aWQoKTtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VSZWNlaXZlclR5cGUuZ3JvdXA7XG4gICAgfVxuICAgIHJldHVybiB7IHJlY2VpdmVySWQ6IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTogcmVjZWl2ZXJUeXBlIH07XG4gIH1cbiAgcGxheUF1ZGlvKCkge1xuICAgIGlmICh0aGlzLmN1c3RvbVNvdW5kRm9yTWVzc2FnZSkge1xuICAgICAgQ29tZXRDaGF0U291bmRNYW5hZ2VyLnBsYXkoXG4gICAgICAgIENvbWV0Q2hhdFNvdW5kTWFuYWdlci5Tb3VuZC5vdXRnb2luZ01lc3NhZ2UsXG4gICAgICAgIHRoaXMuY3VzdG9tU291bmRGb3JNZXNzYWdlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBDb21ldENoYXRTb3VuZE1hbmFnZXIucGxheShDb21ldENoYXRTb3VuZE1hbmFnZXIuU291bmQub3V0Z29pbmdNZXNzYWdlKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSAge30gdGltZXI9bnVsbFxuICAgKiBAcGFyYW0gIHtzdHJpbmc9XCJcIn0gbWV0YWRhdGFcbiAgICovXG4gIHN0YXJ0VHlwaW5nKHRpbWVyID0gbnVsbCwgbWV0YWRhdGE6IHN0cmluZyA9IFwiXCIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZVR5cGluZ0V2ZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHR5cGluZ0ludGVydmFsID0gdGltZXIgfHwgNTAwMDtcbiAgICAgICAgbGV0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuICAgICAgICBsZXQgdHlwaW5nTWV0YWRhdGEgPSBtZXRhZGF0YSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB0eXBpbmdOb3RpZmljYXRpb24gPSBuZXcgQ29tZXRDaGF0LlR5cGluZ0luZGljYXRvcihcbiAgICAgICAgICByZWNlaXZlcklkLFxuICAgICAgICAgIHJlY2VpdmVyVHlwZSxcbiAgICAgICAgICB0eXBpbmdNZXRhZGF0YVxuICAgICAgICApO1xuICAgICAgICBDb21ldENoYXQuc3RhcnRUeXBpbmcodHlwaW5nTm90aWZpY2F0aW9uKTtcbiAgICAgICAgdGhpcy5zdG9yZVR5cGluZ0ludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbmRUeXBpbmcoKTtcbiAgICAgICAgfSwgdHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5vbkVycm9yKSB7XG4gICAgICAgICAgdGhpcy5vbkVycm9yKENvbWV0Q2hhdEV4Y2VwdGlvbihlcnJvcikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWN0aW9ucyA9IChldmVudDogYW55KSA9PiB7XG4gICAgbGV0IGFjdGlvbjogQ29tZXRDaGF0TWVzc2FnZUNvbXBvc2VyQWN0aW9uID0gZXZlbnQ/LmRldGFpbD8uYWN0aW9uO1xuICAgIHRoaXMuc2hvd0FpRmVhdHVyZXMgPSBmYWxzZTtcbiAgICBpZiAoYWN0aW9uLm9uQ2xpY2spIHtcbiAgICAgIGFjdGlvbi5vbkNsaWNrKCk7XG4gICAgfVxuICB9O1xuICBlbmRUeXBpbmcobWV0YWRhdGEgPSBudWxsKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVUeXBpbmdFdmVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCB7IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSB9ID0gdGhpcy5nZXRSZWNlaXZlckRldGFpbHMoKTtcbiAgICAgICAgbGV0IHR5cGluZ01ldGFkYXRhID0gbWV0YWRhdGEgfHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdHlwaW5nTm90aWZpY2F0aW9uID0gbmV3IENvbWV0Q2hhdC5UeXBpbmdJbmRpY2F0b3IoXG4gICAgICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgICAgICByZWNlaXZlclR5cGUsXG4gICAgICAgICAgdHlwaW5nTWV0YWRhdGFcbiAgICAgICAgKTtcbiAgICAgICAgQ29tZXRDaGF0LmVuZFR5cGluZyh0eXBpbmdOb3RpZmljYXRpb24pO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zdG9yZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgdGhpcy5zdG9yZVR5cGluZ0ludGVydmFsID0gbnVsbDtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMub25FcnJvcikge1xuICAgICAgICAgIHRoaXMub25FcnJvcihDb21ldENoYXRFeGNlcHRpb24oZXJyb3IpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogQHBhcmFtICB7RmlsZSB8IENvbWV0Q2hhdC5NZWRpYU1lc3NhZ2V9IG1lc3NhZ2VJbnB1dFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IG1lc3NhZ2VUeXBlXG4gICAqL1xuICBzZW5kTWVkaWFNZXNzYWdlKG1lc3NhZ2VJbnB1dDogRmlsZSwgbWVzc2FnZVR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlU2VuZGluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuICAgICAgbGV0IG1lZGlhTWVzc2FnZTogQ29tZXRDaGF0Lk1lZGlhTWVzc2FnZSA9IG5ldyBDb21ldENoYXQuTWVkaWFNZXNzYWdlKFxuICAgICAgICByZWNlaXZlcklkLFxuICAgICAgICBtZXNzYWdlSW5wdXQsXG4gICAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgICByZWNlaXZlclR5cGVcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgICBtZWRpYU1lc3NhZ2Uuc2V0UGFyZW50TWVzc2FnZUlkKHRoaXMucGFyZW50TWVzc2FnZUlkKTtcbiAgICAgIH1cbiAgICAgIG1lZGlhTWVzc2FnZS5zZXRUeXBlKG1lc3NhZ2VUeXBlKTtcbiAgICAgIG1lZGlhTWVzc2FnZS5zZXRNZXRhZGF0YSh7XG4gICAgICAgIFtcImZpbGVcIl06IG1lc3NhZ2VJbnB1dCxcbiAgICAgIH0pO1xuICAgICAgbWVkaWFNZXNzYWdlLnNldFNlbnRBdChDb21ldENoYXRVSUtpdFV0aWxpdHkuZ2V0VW5peFRpbWVzdGFtcCgpKTtcbiAgICAgIG1lZGlhTWVzc2FnZS5zZXRNdWlkKENvbWV0Q2hhdFVJS2l0VXRpbGl0eS5JRCgpKTtcblxuICAgICAgaWYgKCF0aGlzLmRpc2FibGVTb3VuZEZvck1lc3NhZ2VzKSB7XG4gICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNsb3NlUG9wb3ZlcnMoKTtcbiAgICAgIGlmICghdGhpcy5vblNlbmRCdXR0b25DbGljaykge1xuICAgICAgICBDb21ldENoYXRNZXNzYWdlRXZlbnRzLmNjTWVzc2FnZVNlbnQubmV4dCh7XG4gICAgICAgICAgbWVzc2FnZTogbWVkaWFNZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogTWVzc2FnZVN0YXR1cy5pbnByb2dyZXNzLFxuICAgICAgICB9KTtcbiAgICAgICAgQ29tZXRDaGF0LnNlbmRNZXNzYWdlKG1lZGlhTWVzc2FnZSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2U6IENvbWV0Q2hhdC5CYXNlTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2V0TXVpZChtZWRpYU1lc3NhZ2UuZ2V0TXVpZCgpKTtcbiAgICAgICAgICAgIENvbWV0Q2hhdE1lc3NhZ2VFdmVudHMuY2NNZXNzYWdlU2VudC5uZXh0KHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UsXG4gICAgICAgICAgICAgIHN0YXR1czogTWVzc2FnZVN0YXR1cy5zdWNjZXNzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBtZWRpYU1lc3NhZ2Uuc2V0TWV0YWRhdGEoe1xuICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgQ29tZXRDaGF0TWVzc2FnZUV2ZW50cy5jY01lc3NhZ2VTZW50Lm5leHQoe1xuICAgICAgICAgICAgICBtZXNzYWdlOiBtZWRpYU1lc3NhZ2UsXG4gICAgICAgICAgICAgIHN0YXR1czogTWVzc2FnZVN0YXR1cy5lcnJvcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vblNlbmRCdXR0b25DbGljayhtZWRpYU1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5vbkVycm9yKENvbWV0Q2hhdEV4Y2VwdGlvbihlcnJvcikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbnB1dENoYW5nZUhhbmRsZXIgPSAoZXZlbnQ6IGFueSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPVxuICAgICAgdGhpcy5hY2NlcHRIYW5kbGVyc1t0aGlzLmlucHV0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFjY2VwdF0gfHxcbiAgICAgIHRoaXMub25GaWxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgaGFuZGxlcihldmVudCk7XG4gIH07XG4gIHNlbmRTdGlja2VyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICB0aGlzLnN0aWNrZXJCdXR0b25SZWY/Lm5hdGl2ZUVsZW1lbnQ/LmNsaWNrKCk7XG4gICAgdGhpcy5zaG93U3RpY2tlcktleWJvYXJkID0gZmFsc2U7XG4gICAgbGV0IHN0aWNrZXIgPSBldmVudD8uZGV0YWlsPy5zdGlja2VyVVJMO1xuICAgIGxldCBzdGlja2VyTmFtZTogc3RyaW5nID0gZXZlbnQ/LmRldGFpbD8uc3RpY2tlck5hbWU7XG4gICAgaWYgKHRoaXMuc3RpY2tlckNvbmZpZ3VyYXRpb24/LmNvbmZpZ3VyYXRpb24/LmNjU3RpY2tlckNsaWNrZWQpIHtcbiAgICAgIHRoaXMuc3RpY2tlckNvbmZpZ3VyYXRpb24/LmNvbmZpZ3VyYXRpb24/LmNjU3RpY2tlckNsaWNrZWQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBzdGlja2VyTmFtZSxcbiAgICAgICAgICB1cmw6IHN0aWNrZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyISxcbiAgICAgICAgdGhpcy51c2VyLFxuICAgICAgICB0aGlzLmdyb3VwLFxuICAgICAgICB0aGlzLnBhcmVudE1lc3NhZ2VJZCxcbiAgICAgICAgdGhpcy5vbkVycm9yLFxuICAgICAgICB0aGlzLmN1c3RvbVNvdW5kRm9yTWVzc2FnZSxcbiAgICAgICAgdGhpcy5kaXNhYmxlU291bmRGb3JNZXNzYWdlc1xuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBAcGFyYW0gIHthbnl9IGV2ZW50XG4gICAqL1xuICBvblZpZGVvQ2hhbmdlKGV2ZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFldmVudC50YXJnZXQuZmlsZXNbMF0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgdXBsb2FkZWRGaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgY29uc3QgcmVhZGVyOiBhbnkgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwibG9hZFwiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3RmlsZSA9IG5ldyBGaWxlKFxuICAgICAgICAgICAgW3JlYWRlci5yZXN1bHRdLFxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGVcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2VuZE1lZGlhTWVzc2FnZShcbiAgICAgICAgICAgIG5ld0ZpbGUsXG4gICAgICAgICAgICBDb21ldENoYXRVSUtpdENvbnN0YW50cy5NZXNzYWdlVHlwZXMudmlkZW9cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih1cGxvYWRlZEZpbGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5vbkVycm9yKENvbWV0Q2hhdEV4Y2VwdGlvbihlcnJvcikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtICB7YW55fSBldmVudFxuICAgKi9cbiAgb25BdWRpb0NoYW5nZShldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVwbG9hZGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICAgIGNvbnN0IHJlYWRlcjogYW55ID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImxvYWRcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICAgIFtyZWFkZXIucmVzdWx0XSxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZS5uYW1lLFxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNlbmRNZWRpYU1lc3NhZ2UoXG4gICAgICAgICAgICBuZXdGaWxlLFxuICAgICAgICAgICAgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVR5cGVzLmF1ZGlvXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIodXBsb2FkZWRGaWxlKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBpZiAodGhpcy5vbkVycm9yKSB7XG4gICAgICAgIHRoaXMub25FcnJvcihDb21ldENoYXRFeGNlcHRpb24oZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSAge2FueX0gZXZlbnRcbiAgICovXG4gIG9uSW1hZ2VDaGFuZ2UoZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5maWxlc1swXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCB1cGxvYWRlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgICBjb25zdCByZWFkZXI6IGFueSA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJsb2FkXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdGaWxlID0gbmV3IEZpbGUoXG4gICAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZW5kTWVkaWFNZXNzYWdlKFxuICAgICAgICAgICAgbmV3RmlsZSxcbiAgICAgICAgICAgIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy5pbWFnZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHVwbG9hZGVkRmlsZSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgaWYgKHRoaXMub25FcnJvcikge1xuICAgICAgICB0aGlzLm9uRXJyb3IoQ29tZXRDaGF0RXhjZXB0aW9uKGVycm9yKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0gIHthbnl9IGV2ZW50XG4gICAqL1xuICBvbkZpbGVDaGFuZ2UoZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5maWxlc1tcIjBcIl0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgdXBsb2FkZWRGaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzW1wiMFwiXTtcbiAgICAgIHZhciByZWFkZXI6IGFueSA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJsb2FkXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdGaWxlID0gbmV3IEZpbGUoXG4gICAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZW5kTWVkaWFNZXNzYWdlKFxuICAgICAgICAgICAgbmV3RmlsZSxcbiAgICAgICAgICAgIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy5maWxlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIodXBsb2FkZWRGaWxlKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBpZiAodGhpcy5vbkVycm9yKSB7XG4gICAgICAgIHRoaXMub25FcnJvcihDb21ldENoYXRFeGNlcHRpb24oZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgb3BlbkltYWdlUGlja2VyID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudHlwZSA9IFwiZmlsZVwiO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWNjZXB0ID0gXCJpbWFnZS8qXCI7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIHRoaXMuY2xvc2VQb3BvdmVycygpO1xuICB9O1xuICBvcGVuRmlsZVBpY2tlciA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnR5cGUgPSBcImZpbGVcIjtcbiAgICB0aGlzLmlucHV0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFjY2VwdCA9IFwiZmlsZS8qXCI7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIHRoaXMuY2xvc2VQb3BvdmVycygpO1xuICB9O1xuICBvcGVudmlkZW9QaWNrZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50eXBlID0gXCJmaWxlXCI7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hY2NlcHQgPSBcInZpZGVvLypcIjtcbiAgICB0aGlzLmlucHV0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgdGhpcy5jbG9zZVBvcG92ZXJzKCk7XG4gIH07XG4gIG9wZW5BdWRpb1BpY2tlciA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnR5cGUgPSBcImZpbGVcIjtcbiAgICB0aGlzLmlucHV0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFjY2VwdCA9IFwiYXVkaW8vKlwiO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB0aGlzLmNsb3NlUG9wb3ZlcnMoKTtcbiAgfTtcbiAgb3BlbkFjdGlvblNoZWV0ID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBpZiAoZXZlbnQ/LmRldGFpbD8uaGFzT3duUHJvcGVydHkoXCJpc09wZW5cIikpIHtcbiAgICAgIHRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbSA9IGZhbHNlO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0gPSAhdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtO1xuXG4gICAgdGhpcy5jbG9zZU1lZGlhUmVjb3JkZXIoKTtcbiAgICBpZiAodGhpcy5zaG93RW1vamlLZXlib2FyZCkge1xuICAgICAgdGhpcy5lbW9qaUJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dFbW9qaUtleWJvYXJkID0gIXRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQ7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dTdGlja2VyS2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuc3RpY2tlckJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dTdGlja2VyS2V5Ym9hcmQgPSAhdGhpcy5zaG93U3RpY2tlcktleWJvYXJkO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93QWlGZWF0dXJlcykge1xuICAgICAgdGhpcy5haUJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBaUZlYXR1cmVzID0gIXRoaXMuc2hvd0FpRmVhdHVyZXM7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG4gIGhhbmRsZUFpRmVhdHVyZXNDbG9zZSA9IChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4ge1xuICAgIHRoaXMuYWlGZWF0dXJlc0Nsb3NlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgfTtcblxuICBjbG9zZVNtYXJ0UmVwbHkgPSAoKSA9PiB7XG4gICAgdGhpcy5zaG93QWlGZWF0dXJlcyA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICByZXR1cm47XG4gIH07XG4gIG9wZW5BaUZlYXR1cmVzID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBpZiAodGhpcy5haUZlYXR1cmVzQ2xvc2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5haUZlYXR1cmVzQ2xvc2VDYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAoZXZlbnQ/LmRldGFpbD8uaGFzT3duUHJvcGVydHkoXCJpc09wZW5cIikpIHtcbiAgICAgIHRoaXMuc2hvd0FpRmVhdHVyZXMgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG93QWlGZWF0dXJlcyA9ICF0aGlzLnNob3dBaUZlYXR1cmVzO1xuICAgIHRoaXMuY2xvc2VNZWRpYVJlY29yZGVyKCk7XG4gICAgaWYgKHRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuZW1vamlCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy5zaG93RW1vamlLZXlib2FyZCA9ICF0aGlzLnNob3dFbW9qaUtleWJvYXJkO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93U3RpY2tlcktleWJvYXJkKSB7XG4gICAgICB0aGlzLnN0aWNrZXJCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy5zaG93U3RpY2tlcktleWJvYXJkID0gIXRoaXMuc2hvd1N0aWNrZXJLZXlib2FyZDtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbSkge1xuICAgICAgdGhpcy5hY3Rpb25TaGVldFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0gPSAhdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW1BSSA9IHRydWU7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG4gIG9wZW5FbW9qaUtleWJvYXJkID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBpZiAoZXZlbnQ/LmRldGFpbD8uaGFzT3duUHJvcGVydHkoXCJpc09wZW5cIikpIHtcbiAgICAgIHRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG93RW1vamlLZXlib2FyZCA9ICF0aGlzLnNob3dFbW9qaUtleWJvYXJkO1xuICAgIHRoaXMuY2xvc2VNZWRpYVJlY29yZGVyKCk7XG4gICAgaWYgKHRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbSkge1xuICAgICAgdGhpcy5hY3Rpb25TaGVldFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0gPSAhdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93U3RpY2tlcktleWJvYXJkKSB7XG4gICAgICB0aGlzLnN0aWNrZXJCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy5zaG93U3RpY2tlcktleWJvYXJkID0gIXRoaXMuc2hvd1N0aWNrZXJLZXlib2FyZDtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvd0FpRmVhdHVyZXMpIHtcbiAgICAgIHRoaXMuYWlCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy5zaG93QWlGZWF0dXJlcyA9ICF0aGlzLnNob3dBaUZlYXR1cmVzO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9O1xuICBvcGVuTWVkaWFSZWNvcmRlZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgaWYgKGV2ZW50Py5kZXRhaWw/Lmhhc093blByb3BlcnR5KFwiaXNPcGVuXCIpKSB7XG4gICAgICB0aGlzLnRvZ2dsZU1lZGlhUmVjb3JkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVNZWRpYVJlY29yZGVkID0gIXRoaXMudG9nZ2xlTWVkaWFSZWNvcmRlZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbSkge1xuICAgICAgdGhpcy5hY3Rpb25TaGVldFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0gPSAhdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93RW1vamlLZXlib2FyZCkge1xuICAgICAgdGhpcy5lbW9qaUJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dFbW9qaUtleWJvYXJkID0gIXRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQ7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dTdGlja2VyS2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuc3RpY2tlckJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dTdGlja2VyS2V5Ym9hcmQgPSAhdGhpcy5zaG93U3RpY2tlcktleWJvYXJkO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93QWlGZWF0dXJlcykge1xuICAgICAgdGhpcy5haUJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBaUZlYXR1cmVzID0gIXRoaXMuc2hvd0FpRmVhdHVyZXM7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG4gIG9wZW5TdGlja2VyS2V5Ym9hcmQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGlmIChldmVudD8uZGV0YWlsPy5oYXNPd25Qcm9wZXJ0eShcImlzT3BlblwiKSkge1xuICAgICAgdGhpcy5zaG93U3RpY2tlcktleWJvYXJkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvd1N0aWNrZXJLZXlib2FyZCA9ICF0aGlzLnNob3dTdGlja2VyS2V5Ym9hcmQ7XG4gICAgdGhpcy5jbG9zZU1lZGlhUmVjb3JkZXIoKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbSkge1xuICAgICAgdGhpcy5hY3Rpb25TaGVldFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW0gPSAhdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93RW1vamlLZXlib2FyZCkge1xuICAgICAgdGhpcy5lbW9qaUJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnNob3dFbW9qaUtleWJvYXJkID0gIXRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQ7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG4gIGNsb3NlUG9wb3ZlcnMoKSB7XG4gICAgaWYgKHRoaXMuc2hvd0Vtb2ppS2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuZW1vamlCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgdGhpcy5zaG93RW1vamlLZXlib2FyZCA9ICF0aGlzLnNob3dFbW9qaUtleWJvYXJkO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtKSB7XG4gICAgICB0aGlzLmFjdGlvblNoZWV0UmVmLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICAgIHRoaXMuc2hvd0FjdGlvblNoZWV0SXRlbSA9ICF0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW07XG4gICAgfVxuICB9XG4gIGdldENvbXBvc2VySWQoKTogQ29tcG9zZXJJZCB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMudXNlcjtcbiAgICBpZiAodXNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VyOiB1c2VyPy5nZXRVaWQoKSxcbiAgICAgICAgZ3JvdXA6IG51bGwsXG4gICAgICAgIHBhcmVudE1lc3NhZ2VJZDogdGhpcy5wYXJlbnRNZXNzYWdlSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXA7XG4gICAgaWYgKGdyb3VwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVzZXI6IG51bGwsXG4gICAgICAgIGdyb3VwOiBncm91cD8uZ2V0R3VpZCgpLFxuICAgICAgICBwYXJlbnRNZXNzYWdlSWQ6IHRoaXMucGFyZW50TWVzc2FnZUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdXNlcjogbnVsbCwgZ3JvdXA6IG51bGwsIHBhcmVudE1lc3NhZ2VJZDogdGhpcy5wYXJlbnRNZXNzYWdlSWQgfTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRoZW1lKCk7XG4gICAgdGhpcy50ZXh0Rm9ybWF0dGVyTGlzdCA9IHRoaXMudGV4dEZvcm1hdHRlcnNcbiAgICAgID8gdGhpcy50ZXh0Rm9ybWF0dGVyc1xuICAgICAgOiBbXTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVDbGlja091dHNpZGUpO1xuICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UgPVxuICAgICAgQ2hhdENvbmZpZ3VyYXRvci5nZXREYXRhU291cmNlKCkuZ2V0TWVudGlvbnNUZXh0Rm9ybWF0dGVyKHtcbiAgICAgICAgdGhlbWU6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLFxuICAgICAgfSk7XG4gICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAudGhlbigodXNlcjogQ29tZXRDaGF0LlVzZXIgfCBudWxsKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBDb21ldENoYXQuQ29tZXRDaGF0RXhjZXB0aW9uKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZU1lbnRpb25zRm9ybWF0dGVyKCk7XG5cbiAgICB0aGlzLmFjdGlvbnMgPSBDaGF0Q29uZmlndXJhdG9yLmdldERhdGFTb3VyY2UoKS5nZXRBSU9wdGlvbnMoXG4gICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZSxcbiAgICAgIHRoaXMuZ2V0Q29tcG9zZXJJZCgpIGFzIHVua25vd24gYXMgTWFwPHN0cmluZywgYW55PixcbiAgICAgIHRoaXMuYWlPcHRpb25zU3R5bGVcbiAgICApO1xuICAgIHRoaXMuYWlCb3RMaXN0ID0gW107XG5cblxuICAgIHRoaXMuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB0aGlzLmVuYWJsZVN0aWNrZXJLZXlib2FyZCA9IHRydWU7XG4gICAgdGhpcy5zdGlja2VyQ29uZmlndXJhdGlvbiA9XG4gICAgICBDaGF0Q29uZmlndXJhdG9yLmdldERhdGFTb3VyY2UoKT8uZ2V0QXV4aWxpYXJ5T3B0aW9ucyhcbiAgICAgICAgdGhpcy5jb21wb3NlcklkLFxuICAgICAgICB0aGlzLnVzZXIsXG4gICAgICAgIHRoaXMuZ3JvdXBcbiAgICAgICk7XG4gICAgaWYgKHRoaXMuc3RpY2tlckNvbmZpZ3VyYXRpb24/LmlkID09IFN0aWNrZXJzQ29uc3RhbnRzLnN0aWNrZXIpIHtcbiAgICAgIHRoaXMuZW5hYmxlU3RpY2tlcktleWJvYXJkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGVTdGlja2VyS2V5Ym9hcmQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5lbmFibGVBaUZlYXR1cmVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgZm9yIGRldmVsb3BlciBwcm92aWRlZCBpbnN0YW5jZSBvZiBNZW50aW9uc1RleHRGb3JtYXR0ZXJcbiAgICogSWYgbm90IHByb3ZpZGVkLCBhZGQgZGVmYXVsdFxuICAgKiBJZiBwcm92aWRlZCwgY2hlY2sgaWYgc3R5bGUgaXMgcHJvdmlkZWQgdmlhIGNvbmZpZ3VyYXRpb24sIHRoZW4gYWRkIHN0eWxlLlxuICAgKi9cbiAgaW5pdGlhbGl6ZU1lbnRpb25zRm9ybWF0dGVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5kaXNhYmxlTWVudGlvbnMpIHtcbiAgICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2Uuc2V0TWVudGlvbnNUZXh0U3R5bGUoXG4gICAgICAgIHRoaXMuZ2V0TWVudGlvbnNTdHlsZSgpXG4gICAgICApO1xuICAgICAgbGV0IGZvdW5kTWVudGlvbnNGb3JtYXR0ZXIhOiBDb21ldENoYXRNZW50aW9uc0Zvcm1hdHRlcjtcbiAgICAgIGlmICh0aGlzLnRleHRGb3JtYXR0ZXJzIS5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRleHRGb3JtYXR0ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy50ZXh0Rm9ybWF0dGVyTGlzdFtpXSBpbnN0YW5jZW9mIENvbWV0Q2hhdE1lbnRpb25zRm9ybWF0dGVyXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmb3VuZE1lbnRpb25zRm9ybWF0dGVyID0gdGhpcy50ZXh0Rm9ybWF0dGVyTGlzdFtcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXSBhcyBDb21ldENoYXRNZW50aW9uc0Zvcm1hdHRlcjtcbiAgICAgICAgICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UgPSBmb3VuZE1lbnRpb25zRm9ybWF0dGVyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3VuZE1lbnRpb25zRm9ybWF0dGVyKSB7XG4gICAgICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UgPSBmb3VuZE1lbnRpb25zRm9ybWF0dGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLm1lbnRpb25zVGV4dEZvcm1hdHRlckluc3RhbmNlLmdldEtleVVwQ2FsbEJhY2soKSB8fFxuICAgICAgICB0aGlzLm1lbnRpb25zVGV4dEZvcm1hdHRlckluc3RhbmNlLmdldEtleURvd25DYWxsQmFjaygpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZS5zZXRLZXlVcENhbGxCYWNrKFxuICAgICAgICAgIHRoaXMuc2VhcmNoTWVudGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZS5zZXRLZXlEb3duQ2FsbEJhY2soXG4gICAgICAgICAgdGhpcy5zZWFyY2hNZW50aW9uc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLm1lbnRpb25zVGV4dEZvcm1hdHRlckluc3RhbmNlLnNldElkKFxuICAgICAgICAgIHRoaXMubWVudGlvbnNGb3JtYXR0ZXJJbnN0YW5jZUlkXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZm91bmRNZW50aW9uc0Zvcm1hdHRlcikge1xuICAgICAgICB0aGlzLnRleHRGb3JtYXR0ZXJMaXN0LnB1c2godGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGdldE1lbnRpb25zU3R5bGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMubWVudGlvblN0eWxlTG9jYWw7XG4gIH07XG5cbiAgZ2V0U21hcnRSZXBsaWVzID0gKCkgPT4ge1xuICAgIHRoaXMuc2hvd1NtYXJ0UmVwbHkgPSB0cnVlO1xuICAgIHRoaXMucmVwbGllc0FycmF5ID0gW107XG4gICAgdGhpcy5zaG93QWN0aW9uU2hlZXRJdGVtQUkgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBaUJvdExpc3QgPSBmYWxzZTtcblxuICAgIHRoaXMuc21hcnRSZXBseVN0YXRlID0gU3RhdGVzLmxvYWRpbmc7XG5cbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCByZWNlaXZlcklkOiBzdHJpbmcgPSB0aGlzLnVzZXJcbiAgICAgICAgPyB0aGlzLnVzZXI/LmdldFVpZCgpXG4gICAgICAgIDogdGhpcy5ncm91cD8uZ2V0R3VpZCgpO1xuICAgICAgbGV0IHJlY2VpdmVyVHlwZTogc3RyaW5nID0gdGhpcy51c2VyXG4gICAgICAgID8gQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVJlY2VpdmVyVHlwZS51c2VyXG4gICAgICAgIDogQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVJlY2VpdmVyVHlwZS5ncm91cDtcbiAgICAgIENvbWV0Q2hhdC5nZXRTbWFydFJlcGxpZXMocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlKVxuICAgICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgIGxldCByZXBsaWVzQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgT2JqZWN0LmtleXMocmVzcG9uc2UpLmZvckVhY2goKHJlcGx5KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VbcmVwbHldICYmIHJlc3BvbnNlW3JlcGx5XSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVwbGllc0FycmF5LnB1c2gocmVzcG9uc2VbcmVwbHldKTtcbiAgICAgICAgICAgICAgcmVwbGllc0FycmF5LnB1c2gocmVzcG9uc2VbcmVwbHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXNvbHZlKHJlcGxpZXNBcnJheSk7XG5cbiAgICAgICAgICB0aGlzLnNtYXJ0UmVwbHlTdGF0ZSA9IFN0YXRlcy5sb2FkZWQ7XG5cbiAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBDb21ldENoYXQuQ29tZXRDaGF0RXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5zbWFydFJlcGx5U3RhdGUgPSBTdGF0ZXMuZXJyb3I7XG4gICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZW5hYmxlQWlGZWF0dXJlcygpIHtcbiAgICBpZiAodGhpcy5hY3Rpb25zICYmIHRoaXMuYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzQWlFbmFibGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5hY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLmlkID09PSBcImFpLXNtYXJ0LXJlcGx5XCIpIHtcbiAgICAgICAgICBjb25zdCBuZXdCdXR0b24gPSB7XG4gICAgICAgICAgICAuLi5hY3Rpb24sXG4gICAgICAgICAgICB0aXRsZTogYWN0aW9uLnRpdGxlISxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuZ2V0U21hcnRSZXBsaWVzLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLmlkID09PSBcImFpLWNvbnZlcnNhdGlvbi1zdW1tYXJ5XCIpIHtcbiAgICAgICAgICBjb25zdCBuZXdCdXR0b24gPSB7XG4gICAgICAgICAgICAuLi5hY3Rpb24sXG4gICAgICAgICAgICB0aXRsZTogYWN0aW9uLnRpdGxlISxcbiAgICAgICAgICAgIGlkOiBhY3Rpb24uaWQsXG4gICAgICAgICAgICBvbkNsaWNrOiBhc3luYyAoKSA9PiB0aGlzLmNhbGxDb252ZXJzYXRpb25TdW1tYXJ5TWV0aG9kKCksXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLmlkID09PSBcImFpLWJvdHNcIikge1xuICAgICAgICAgIGNvbnN0IG5ld0J1dHRvbiA9IHtcbiAgICAgICAgICAgIC4uLmFjdGlvbixcbiAgICAgICAgICAgIHRpdGxlOiBhY3Rpb24udGl0bGUhLFxuICAgICAgICAgICAgaWQ6IGFjdGlvbi5pZCxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGFzeW5jICgpID0+XG4gICAgICAgICAgICAgIHRoaXMuc2hvd0FpQm90TWVzc2FnZUxpc3RNZXRob2QoKGFjdGlvbiBhcyBhbnkpLm9uQ2xpY2soKSksXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2hvd0FpQm90TWVzc2FnZUxpc3RNZXRob2QgPSAoYWN0aW9uOiBhbnkpID0+IHtcbiAgICB0aGlzLmFpQm90TGlzdCA9IGFjdGlvbjtcbiAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW1BSSA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FpQm90TGlzdCA9IHRydWU7XG5cbiAgICB0aGlzLmFpQWN0aW9uQnV0dG9ucy5sZW5ndGggPSAwO1xuXG4gICAgdGhpcy5haUJvdExpc3QuZm9yRWFjaCgoZTogYW55LCBpOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5ld0J1dHRvbiA9IHtcbiAgICAgICAgaWQ6IGUuaWQsXG4gICAgICAgIHRpdGxlOiBlLnRpdGxlLFxuICAgICAgICBvbkNsaWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgQ29tZXRDaGF0VUlFdmVudHMuY2NTaG93UGFuZWwubmV4dCh7XG4gICAgICAgICAgICBjaGlsZDogeyBib3Q6IGUsIHNob3dCb3RWaWV3OiB0cnVlIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFpQWN0aW9uQnV0dG9ucy5wdXNoKG5ld0J1dHRvbik7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG5cbiAgc2VuZFJlcGx5ID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBsZXQgcmVwbHk6IHN0cmluZyA9IGV2ZW50Py5kZXRhaWw/LnJlcGx5O1xuICAgIENvbWV0Q2hhdFVJRXZlbnRzLmNjQ29tcG9zZU1lc3NhZ2UubmV4dChyZXBseSk7XG4gICAgdGhpcy5yZXBsaWVzQXJyYXkgPSBbXTtcbiAgICB0aGlzLnNob3dBY3Rpb25TaGVldEl0ZW1BSSA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FpRmVhdHVyZXMgPSBmYWxzZTtcbiAgICB0aGlzLmFpQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcblxuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBjb21wb3NlcldyYXBwZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5oZWlnaHQsXG4gICAgICB3aWR0aDogdGhpcy5tZXNzYWdlQ29tcG9zZXJTdHlsZT8ud2lkdGgsXG4gICAgICBiYWNrZ3JvdW5kOiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5iYWNrZ3JvdW5kLFxuICAgICAgYm9yZGVyOiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5ib3JkZXIsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmJvcmRlclJhZGl1cyxcbiAgICB9O1xuICB9XG4gIHNldFRoZW1lKCkge1xuICAgIHRoaXMuZW1vamlQb3BvdmVyLmJveFNoYWRvdyA9IGAwcHggMHB4IDMycHggJHt0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDUwKCl9YDtcbiAgICB0aGlzLnN0aWNrZXJQb3BvdmVyLmJveFNoYWRvdyA9IGAwcHggMHB4IDMycHggJHt0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDUwKCl9YDtcbiAgICB0aGlzLm1lZGlhUmVjb3JkZWRQb3BvdmVyLmJveFNoYWRvdyA9IGAwcHggMHB4IDMycHggJHt0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDUwKCl9YDtcbiAgICB0aGlzLmFpUG9wb3Zlci5iYWNrZ3JvdW5kID0gdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRCYWNrZ3JvdW5kKCk7XG4gICAgdGhpcy5haVBvcG92ZXIuYm94U2hhZG93ID0gYDBweCAwcHggMzJweCAke3RoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NTAoKX1gO1xuICAgIHRoaXMuc2V0Q29tcG9zZXJTdHlsZSgpO1xuICAgIHRoaXMuYWN0aW9uU2hlZXRTdHlsZSA9IHtcbiAgICAgIGxheW91dE1vZGVJY29uVGludDpcbiAgICAgICAgdGhpcy5hY3Rpb25TaGVldFN0eWxlLmxheW91dE1vZGVJY29uVGludCB8fFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudCgpLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcImluaGVyaXRcIixcbiAgICAgIGJhY2tncm91bmQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QmFja2dyb3VuZCgpLFxuICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICB0aXRsZUZvbnQ6XG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRTdHlsZS50aXRsZUZvbnQgfHxcbiAgICAgICAgZm9udEhlbHBlcih0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnRpdGxlMiksXG4gICAgICB0aXRsZUNvbG9yOlxuICAgICAgICB0aGlzLmFjdGlvblNoZWV0U3R5bGUudGl0bGVDb2xvciB8fFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudCgpLFxuICAgICAgQWN0aW9uU2hlZXRTZXBhcmF0b3JUaW50OlxuICAgICAgICB0aGlzLmFjdGlvblNoZWV0U3R5bGUuQWN0aW9uU2hlZXRTZXBhcmF0b3JUaW50IHx8XG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NDAwKCksXG4gICAgfTtcbiAgICB0aGlzLmFpQWN0aW9uU2hlZXRTdHlsZSA9IHtcbiAgICAgIGxheW91dE1vZGVJY29uVGludDpcbiAgICAgICAgdGhpcy5haUFjdGlvblNoZWV0U3R5bGUubGF5b3V0TW9kZUljb25UaW50IHx8XG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50KCksXG4gICAgICBib3JkZXJSYWRpdXM6IFwiaW5oZXJpdFwiLFxuICAgICAgYmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRCYWNrZ3JvdW5kKCksXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIHRpdGxlRm9udDpcbiAgICAgICAgdGhpcy5haUFjdGlvblNoZWV0U3R5bGUudGl0bGVGb250IHx8XG4gICAgICAgIGZvbnRIZWxwZXIodGhpcy50aGVtZVNlcnZpY2UudGhlbWUudHlwb2dyYXBoeS50aXRsZTIpLFxuICAgICAgdGl0bGVDb2xvcjpcbiAgICAgICAgdGhpcy5haUFjdGlvblNoZWV0U3R5bGUudGl0bGVDb2xvciB8fFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudCgpLFxuICAgICAgQWN0aW9uU2hlZXRTZXBhcmF0b3JUaW50OlxuICAgICAgICB0aGlzLmFpQWN0aW9uU2hlZXRTdHlsZS5BY3Rpb25TaGVldFNlcGFyYXRvclRpbnQgfHxcbiAgICAgICAgYDFweCBzb2xpZCAke3RoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NDAwKCl9YCxcbiAgICB9O1xuICAgIHRoaXMudGV4dElucHV0U3R5bGUgPSB7XG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgbWF4SGVpZ2h0OiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5tYXhJbnB1dEhlaWdodCB8fCBcIjEwMHB4XCIsXG4gICAgICBib3JkZXI6IHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmlucHV0Qm9yZGVyLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5pbnB1dEJvcmRlclJhZGl1cyxcbiAgICAgIGJhY2tncm91bmQ6IHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmlucHV0QmFja2dyb3VuZCxcbiAgICAgIHRleHRGb250OiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy50ZXh0Rm9udCxcbiAgICAgIHRleHRDb2xvcjogdGhpcy5tZXNzYWdlQ29tcG9zZXJTdHlsZT8udGV4dENvbG9yLFxuICAgICAgZGl2aWRlckNvbG9yOiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5kaXZpZGVyVGludCxcbiAgICB9O1xuICAgIHRoaXMuZGlzYWJsZVNlbmRCdXR0b24oKVxuICAgIHRoaXMucHJldmlld1N0eWxlID0ge1xuICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50MjAwKCl9YCxcbiAgICAgIGJhY2tncm91bmQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QmFja2dyb3VuZCgpLFxuICAgICAgcHJldmlld1RpdGxlRm9udDpcbiAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9zZXJTdHlsZT8ucHJldmlld1RpdGxlRm9udCB8fFxuICAgICAgICBmb250SGVscGVyKHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnR5cG9ncmFwaHkuc3VidGl0bGUxKSxcbiAgICAgIHByZXZpZXdUaXRsZUNvbG9yOlxuICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5wcmV2aWV3VGl0bGVDb2xvciB8fFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDQwMCgpLFxuICAgICAgcHJldmlld1N1YnRpdGxlQ29sb3I6XG4gICAgICAgIHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LnByZXZpZXdTdWJ0aXRsZUNvbG9yIHx8XG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NDAwKCksXG4gICAgICBwcmV2aWV3U3VidGl0bGVGb250OlxuICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5wcmV2aWV3U3VidGl0bGVGb250IHx8XG4gICAgICAgIGZvbnRIZWxwZXIodGhpcy50aGVtZVNlcnZpY2UudGhlbWUudHlwb2dyYXBoeS5zdWJ0aXRsZTIpLFxuICAgICAgY2xvc2VCdXR0b25JY29uVGludDpcbiAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9zZXJTdHlsZT8uY2xvc2VQcmV2aWV3VGludCB8fFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCdcbiAgICB9O1xuICAgIGxldCBidXR0b25TdHlsZSA9IHtcbiAgICAgIGhlaWdodDogXCIyNHB4XCIsXG4gICAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjBcIixcbiAgICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICB9O1xuICAgIGxldCBkZWZhdWx0TWVkaWFSZWNvcmRlclN0eWxlID0gbmV3IE1lZGlhUmVjb3JkZXJTdHlsZSh7XG4gICAgICBzdGFydEljb25UaW50OiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEVycm9yKCksXG4gICAgICBzdWJtaXRJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIHN0b3BJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRFcnJvcigpLFxuICAgICAgY2xvc2VJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBiYWNrZ3JvdW5kOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEJhY2tncm91bmQoKSxcbiAgICAgIHRpbWVyVGV4dEZvbnQ6IGZvbnRIZWxwZXIodGhpcy50aGVtZVNlcnZpY2UudGhlbWUudHlwb2dyYXBoeS5zdWJ0aXRsZTIpLFxuICAgICAgdGltZXJUZXh0Q29sb3I6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NDAwKCksXG4gICAgfSk7XG4gICAgdGhpcy5tZWRpYVJlY29yZGVkUG9wb3Zlci5iYWNrZ3JvdW5kID1cbiAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QmFja2dyb3VuZCgpO1xuICAgIHRoaXMubWVkaWFSZWNvcmRlclN0eWxlLmJvcmRlciA9IGAxcHggc29saWQgJHt0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDEwMCgpfWA7XG4gICAgdGhpcy5tZWRpYVJlY29yZGVyU3R5bGUgPSB7XG4gICAgICAuLi5kZWZhdWx0TWVkaWFSZWNvcmRlclN0eWxlLFxuICAgICAgLi4udGhpcy5tZWRpYVJlY29yZGVyU3R5bGUsXG4gICAgfTtcbiAgICB0aGlzLmVtb2ppUG9wb3Zlci5ib3hTaGFkb3cgPSBgMHB4IDBweCA4cHggJHt0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDUwKCl9YDtcbiAgICB0aGlzLnN0aWNrZXJQb3BvdmVyLmJveFNoYWRvdyA9IGAwcHggMHB4IDhweCAke3RoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NTAoKX1gO1xuICAgIHRoaXMubWVkaWFSZWNvcmRlZFBvcG92ZXIuYm94U2hhZG93ID0gYDBweCAwcHggOHB4ICR7dGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ1MCgpfWA7XG4gICAgdGhpcy5lbW9qaUJ1dHRvblN0eWxlID0ge1xuICAgICAgYnV0dG9uSWNvblRpbnQ6XG4gICAgICAgIHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmVtb2ppSWNvblRpbnQgfHxcbiAgICAgICAgdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIC4uLmJ1dHRvblN0eWxlLFxuICAgIH07XG4gICAgdGhpcy5zdGlja2VyQnV0dG9uU3R5bGUgPSB7XG4gICAgICBidXR0b25JY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIC4uLmJ1dHRvblN0eWxlLFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVJlY29yZGVyQnV0dG9uU3R5bGUgPSB7XG4gICAgICBidXR0b25JY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIC4uLmJ1dHRvblN0eWxlLFxuICAgIH07XG4gICAgdGhpcy5lbW9qaUtleWJvYXJkU3R5bGUgPSB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgIHRleHRGb250OiB0aGlzLm1lc3NhZ2VDb21wb3NlclN0eWxlPy5lbW9qaUtleWJvYXJkVGV4dEZvbnQsXG4gICAgICB0ZXh0Q29sb3I6IHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmVtb2ppS2V5Ym9hcmRUZXh0Q29sb3IsXG4gICAgICBiYWNrZ3JvdW5kOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEJhY2tncm91bmQoKSxcbiAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCIsXG4gICAgICBhY3RpdmVJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRQcmltYXJ5KCksXG4gICAgICBpY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKVxuICAgIH07XG5cbiAgICB0aGlzLnN0aWNrZXJLZXlib2FyZFN0eWxlID0ge1xuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgICBlbXB0eVN0YXRlVGV4dEZvbnQ6IGZvbnRIZWxwZXIodGhpcy50aGVtZVNlcnZpY2UudGhlbWUudHlwb2dyYXBoeS50aXRsZTEpLFxuICAgICAgZW1wdHlTdGF0ZVRleHRDb2xvcjogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIGVycm9yU3RhdGVUZXh0Rm9udDogZm9udEhlbHBlcih0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnRpdGxlMSksXG4gICAgICBlcnJvclN0YXRlVGV4dENvbG9yOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpLFxuICAgICAgbG9hZGluZ0ljb25UaW50OiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpLFxuICAgICAgYmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRCYWNrZ3JvdW5kKCksXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMTJweFwiLFxuICAgICAgY2F0ZWdvcnlCYWNrZ3JvdW5kOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEJhY2tncm91bmQoKSxcbiAgICB9O1xuICAgIHRoaXMuYXR0YWNobWVudEJ1dHRvblN0eWxlID0ge1xuICAgICAgaGVpZ2h0OiBcIjI0cHhcIixcbiAgICAgIHdpZHRoOiBcIjI0cHhcIixcbiAgICAgIGJvcmRlcjogXCJub25lXCIsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgICAgYnV0dG9uSWNvblRpbnQ6XG4gICAgICAgIHRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGU/LmF0dGFjaEljb250aW50IHx8XG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKCksXG4gICAgICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZVBvbGxTdHlsZSA9IHtcbiAgICAgIHBsYWNlaG9sZGVyVGV4dEZvbnQ6IGZvbnRIZWxwZXIoXG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnR5cG9ncmFwaHkuc3VidGl0bGUxXG4gICAgICApLFxuICAgICAgcGxhY2Vob2xkZXJUZXh0Q29sb3I6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKCksXG4gICAgICBkZWxldGVJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ2MDAoKSxcbiAgICAgIHRpdGxlRm9udDogZm9udEhlbHBlcih0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnRpdGxlMSksXG4gICAgICB0aXRsZUNvbG9yOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudCgpLFxuICAgICAgY2xvc2VJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRQcmltYXJ5KCksXG4gICAgICBxdWVzdGlvbklucHV0QmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQxMDAoKSxcbiAgICAgIG9wdGlvbklucHV0QmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQxMDAoKSxcbiAgICAgIGFuc3dlckhlbHBUZXh0Rm9udDogZm9udEhlbHBlcihcbiAgICAgICAgdGhpcy50aGVtZVNlcnZpY2UudGhlbWUudHlwb2dyYXBoeS5jYXB0aW9uMVxuICAgICAgKSxcbiAgICAgIGFuc3dlckhlbHBUZXh0Q29sb3I6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NDAwKCksXG4gICAgICBhZGRBbnN3ZXJJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRQcmltYXJ5KCksXG4gICAgICBjcmVhdGVQb2xsQnV0dG9uVGV4dEZvbnQ6IGZvbnRIZWxwZXIoXG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnR5cG9ncmFwaHkudGV4dDJcbiAgICAgICksXG4gICAgICBjcmVhdGVQb2xsQnV0dG9uVGV4dENvbG9yOlxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudChcImRhcmtcIiksXG4gICAgICBjcmVhdGVQb2xsQnV0dG9uQmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRQcmltYXJ5KCksXG4gICAgICBhZGRBbnN3ZXJUZXh0Rm9udDogZm9udEhlbHBlcih0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnRleHQyKSxcbiAgICAgIGFkZEFuc3dlclRleHRDb2xvcjogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRQcmltYXJ5KCksXG4gICAgICBlcnJvclRleHRGb250OiBmb250SGVscGVyKHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnR5cG9ncmFwaHkuc3VidGl0bGUxKSxcbiAgICAgIGVycm9yVGV4dENvbG9yOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEVycm9yKCksXG4gICAgICBvcHRpb25QbGFjZWhvbGRlclRleHRGb250OiBmb250SGVscGVyKFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnN1YnRpdGxlMVxuICAgICAgKSxcbiAgICAgIG9wdGlvblBsYWNlaG9sZGVyVGV4dENvbG9yOlxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpLFxuICAgICAgcXVlc3Rpb25JbnB1dFRleHRGb250OiBmb250SGVscGVyKFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnN1YnRpdGxlMlxuICAgICAgKSxcbiAgICAgIHF1ZXN0aW9uSW5wdXRUZXh0Q29sb3I6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKCksXG4gICAgICBvcHRpb25JbnB1dFRleHRGb250OiBmb250SGVscGVyKFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnN1YnRpdGxlMlxuICAgICAgKSxcbiAgICAgIG9wdGlvbklucHV0VGV4dENvbG9yOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpLFxuICAgICAgd2lkdGg6IFwiMzYwcHhcIixcbiAgICAgIGhlaWdodDogXCI2MjBweFwiLFxuICAgICAgYm9yZGVyOiBcIlwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxuICAgICAgYmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ5MDAoKSxcbiAgICB9O1xuICB9XG4gIHNldENvbXBvc2VyU3R5bGUoKSB7XG4gICAgbGV0IGRlZmF1bHRTdHlsZTogTWVzc2FnZUNvbXBvc2VyU3R5bGUgPSBuZXcgTWVzc2FnZUNvbXBvc2VyU3R5bGUoe1xuICAgICAgYmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRCYWNrZ3JvdW5kKCksXG4gICAgICBib3JkZXI6IGBub25lYCxcbiAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgICAgYXR0YWNoSWNvbnRpbnQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NTAwKCksXG4gICAgICBzZW5kSWNvblRpbnQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0UHJpbWFyeSgpLFxuICAgICAgZW1vamlJY29uVGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ1MDAoKSxcbiAgICAgIGlucHV0QmFja2dyb3VuZDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQxMDAoKSxcbiAgICAgIGlucHV0Qm9yZGVyOiBcIm5vbmVcIixcbiAgICAgIGlucHV0Qm9yZGVyUmFkaXVzOiBcIjEycHhcIixcbiAgICAgIGRpdmlkZXJUaW50OiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDIwMCgpLFxuICAgICAgdGV4dEZvbnQ6IGZvbnRIZWxwZXIodGhpcy50aGVtZVNlcnZpY2UudGhlbWUudHlwb2dyYXBoeS5zdWJ0aXRsZTEpLFxuICAgICAgdGV4dENvbG9yOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudCgpLFxuXG4gICAgICBlbW9qaUtleWJvYXJkVGV4dEZvbnQ6IGZvbnRIZWxwZXIoXG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnR5cG9ncmFwaHkuc3VidGl0bGUyXG4gICAgICApLFxuICAgICAgZW1vamlLZXlib2FyZFRleHRDb2xvcjogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ0MDAoKSxcbiAgICAgIHByZXZpZXdUaXRsZUZvbnQ6IGZvbnRIZWxwZXIoXG4gICAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnR5cG9ncmFwaHkuc3VidGl0bGUxXG4gICAgICApLFxuICAgICAgcHJldmlld1RpdGxlQ29sb3I6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50KCksXG4gICAgICBwcmV2aWV3U3VidGl0bGVGb250OiBmb250SGVscGVyKFxuICAgICAgICB0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnN1YnRpdGxlMlxuICAgICAgKSxcbiAgICAgIHByZXZpZXdTdWJ0aXRsZUNvbG9yOiB0aGlzLnRoZW1lU2VydmljZS50aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpLFxuICAgICAgY2xvc2VQcmV2aWV3VGludDogdGhpcy50aGVtZVNlcnZpY2UudGhlbWUucGFsZXR0ZS5nZXRBY2NlbnQ1MDAoKSxcbiAgICAgIG1heElucHV0SGVpZ2h0OiBcIjEwMHB4XCIsXG4gICAgfSk7XG4gICAgdGhpcy5tZXNzYWdlQ29tcG9zZXJTdHlsZSA9IHtcbiAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgIC4uLnRoaXMubWVzc2FnZUNvbXBvc2VyU3R5bGUsXG4gICAgfTtcbiAgfVxuICBjbG9zZVByZXZpZXcoKSB7XG4gICAgdGhpcy5zaG93U2VuZEJ1dHRvbiA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0xpc3RGb3JNZW50aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd01lbnRpb25zQ291bnRXYXJuaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UHJldmlldyA9IGZhbHNlO1xuICAgIHRoaXMuZWRpdFByZXZpZXdUZXh0ID0gXCJcIjtcbiAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gbnVsbDtcbiAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgIHRoaXMubWVzc2FnZVRleHQgPSBcIlwiO1xuICAgIHRoaXMuaW5wdXRSZWY/Lm5hdGl2ZUVsZW1lbnQ/LmVtcHR5SW5wdXRGaWVsZCgpO1xuICAgIHRoaXMuZGlzYWJsZVNlbmRCdXR0b24oKTtcbiAgfVxuICBiYWNrQnV0dG9uU3R5bGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogXCIyNHB4XCIsXG4gICAgICB3aWR0aDogXCIyNHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuXG4gICAgICBib3JkZXJSYWRpdXM6IFwiMFwiLFxuICAgICAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgYnV0dG9uSWNvblRpbnQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0UHJpbWFyeSgpLFxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgc2VhcmNoIHRlcm0gZnJvbSBtZW50aW9uc1RleHRGb3JtYXR0ZXIgYW5kIG9wZW5zIHRoZSBtZW50aW9ucyBzZWxlY3QgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHNlYXJjaE1lbnRpb25zID0gKHNlYXJjaFRlcm06IHN0cmluZykgPT4ge1xuICAgIGlmICghKHNlYXJjaFRlcm0gJiYgc2VhcmNoVGVybS5sZW5ndGgpKSB7XG4gICAgICB0aGlzLm1lbnRpb25zU2VhcmNoVGVybSA9IFwiXCI7XG4gICAgICB0aGlzLnNob3dMaXN0Rm9yTWVudGlvbnMgPSBmYWxzZTtcbiAgICAgIHRoaXMubWVudGlvbnNTZWFyY2hDb3VudCA9IDE7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIXRoaXMubGFzdEVtcHR5U2VhcmNoVGVybSB8fFxuICAgICAgIXNlYXJjaFRlcm1cbiAgICAgICAgLnNwbGl0KFwiQFwiKVsxXVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAuc3RhcnRzV2l0aCh0aGlzLmxhc3RFbXB0eVNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcbiAgICApIHtcbiAgICAgIHRoaXMubWVudGlvbnNTZWFyY2hUZXJtID1cbiAgICAgICAgc2VhcmNoVGVybS5zcGxpdChcIkBcIilbMV0gJiYgc2VhcmNoVGVybS5zcGxpdChcIkBcIilbMV0ubGVuZ3RoXG4gICAgICAgICAgPyBzZWFyY2hUZXJtLnNwbGl0KFwiQFwiKVsxXVxuICAgICAgICAgIDogXCJcIjtcbiAgICAgIHRoaXMuc2hvd0xpc3RGb3JNZW50aW9ucyA9IHRydWU7XG4gICAgICB0aGlzLm1lbnRpb25zU2VhcmNoQ291bnQrKztcbiAgICAgIHRoaXMubGFzdEVtcHR5U2VhcmNoVGVybSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGNsaWNraW5nIGEgdXNlciBmcm9tIHRoZSBtZW50aW9ucyBsaXN0LlxuICAgKiBBZGQgdGhlIHVzZXIgdG8gbWVudGlvbnMgdGV4dCBmb3JtYXR0ZXIgaW5zdGFuY2UgYW5kIHRoZW4gY2FsbCByZXJlbmRlciB0byBzdHlsZSB0aGUgbWVudGlvblxuICAgKiB3aXRoaW4gbWVzc2FnZSBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIHtDb21ldENoYXQuVXNlcn0gdXNlclxuICAgKi9cbiAgZGVmYXVsdE1lbnRpb25zSXRlbUNsaWNrSGFuZGxlciA9IChcbiAgICB1c2VyOiBDb21ldENoYXQuVXNlciB8IENvbWV0Q2hhdC5Hcm91cE1lbWJlclxuICApID0+IHtcbiAgICBsZXQgY29tZXRDaGF0VXNlcnMgPSBbdXNlcl07XG4gICAgdGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZS5zZXRDb21ldENoYXRVc2VyR3JvdXBNZW1iZXJzKFxuICAgICAgY29tZXRDaGF0VXNlcnNcbiAgICApO1xuICAgIHRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2Uuc2V0TG9nZ2VkSW5Vc2VyKHRoaXMubG9nZ2VkSW5Vc2VyISk7XG4gICAgdGhpcy5tZW50aW9uZWRVc2VycyA9IFtcbiAgICAgIC4uLnRoaXMubWVudGlvbnNUZXh0Rm9ybWF0dGVySW5zdGFuY2UuZ2V0Q29tZXRDaGF0VXNlckdyb3VwTWVtYmVycygpLFxuICAgIF07XG4gICAgdGhpcy5tZW50aW9uc1RleHRGb3JtYXR0ZXJJbnN0YW5jZS5yZVJlbmRlcigpO1xuICAgIHRoaXMuc2hvd0xpc3RGb3JNZW50aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMubWVudGlvbnNTZWFyY2hUZXJtID0gXCJcIjtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlIG1lbnRpb25zIGxpc3QgaWYgc2VhcmNoIHJldHVybnMgZW1wdHkgbGlzdFxuICAgKi9cbiAgZGVmYXVsdE9uRW1wdHlGb3JNZW50aW9ucyA9ICgpID0+IHtcbiAgICB0aGlzLmxhc3RFbXB0eVNlYXJjaFRlcm0gPSB0aGlzLm1lbnRpb25zU2VhcmNoVGVybTtcbiAgICB0aGlzLnNob3dMaXN0Rm9yTWVudGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLm1lbnRpb25zU2VhcmNoVGVybSA9IFwiXCI7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuXG4gIGdldE1lbnRpb25JbmZvSWNvblN0eWxlID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IFwiZml0LWNvbnRlbnRcIixcbiAgICAgIHdpZHRoOiBcImZpdC1jb250ZW50XCIsXG4gICAgICBidXR0b25UZXh0Rm9udDogZm9udEhlbHBlcih0aGlzLnRoZW1lU2VydmljZS50aGVtZS50eXBvZ3JhcGh5LnN1YnRpdGxlMiksXG4gICAgICBidXR0b25UZXh0Q29sb3I6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKCksXG4gICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgYnV0dG9uSWNvblRpbnQ6IHRoaXMudGhlbWVTZXJ2aWNlLnRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKCksXG4gICAgICBwYWRkaW5nOiBcIjhweFwiLFxuICAgICAgaWNvbkhlaWdodDogXCIyMHB4XCIsXG4gICAgICBpY29uV2lkdGg6IFwiMjBweFwiLFxuICAgICAgaWNvbkJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgIGdhcDogXCI1cHhcIixcbiAgICB9O1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudDogYW55KSA9PiB7XG4gICAgaWYgKHRoaXMudXNlck1lbWJlcldyYXBwZXJSZWYpIHtcbiAgICAgIGNvbnN0IHVzZXJNZW1iZXJXcmFwcGVyUmVjdCA9XG4gICAgICAgIHRoaXMudXNlck1lbWJlcldyYXBwZXJSZWY/Lm5hdGl2ZUVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgaXNPdXRzaWRlQ2xpY2sgPVxuICAgICAgICBldmVudD8uY2xpZW50WCA8PSB1c2VyTWVtYmVyV3JhcHBlclJlY3Q/LmxlZnQgfHxcbiAgICAgICAgZXZlbnQ/LmNsaWVudFggPj0gdXNlck1lbWJlcldyYXBwZXJSZWN0Py5yaWdodCB8fFxuICAgICAgICBldmVudD8uY2xpZW50WSA+PSB1c2VyTWVtYmVyV3JhcHBlclJlY3Q/LnRvcCB8fFxuICAgICAgICBldmVudD8uY2xpZW50WSA8PSB1c2VyTWVtYmVyV3JhcHBlclJlY3Q/LmJvdHRvbTtcbiAgICAgIGlmIChpc091dHNpZGVDbGljaykge1xuICAgICAgICB0aGlzLnNob3dMaXN0Rm9yTWVudGlvbnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZW50aW9uc1NlYXJjaFRlcm0gPSBcIlwiO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbnMge1xuICB0aXRsZTogc3RyaW5nO1xuICBpZDogc3RyaW5nO1xuICBvbkNsaWNrOiAoKSA9PiBQcm9taXNlPHVua25vd24+O1xufVxuIiwiPGRpdiBjbGFzcz1cImNjLW1lc3NhZ2UtY29tcG9zZXJfX3dyYXBwZXJcIiBbbmdTdHlsZV09XCJjb21wb3NlcldyYXBwZXJTdHlsZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJjYy1tZXNzYWdlY29tcG9zZXJfX21lbnRpb25zXCIgI3VzZXJNZW1iZXJXcmFwcGVyUmVmPlxuICAgIDxjb21ldGNoYXQtdXNlci1tZW1iZXItd3JhcHBlciAqbmdJZj1cInNob3dMaXN0Rm9yTWVudGlvbnNcIlxuICAgICAgW3VzZXJNZW1iZXJMaXN0VHlwZV09XCJ1c2VyTWVtYmVyTGlzdFR5cGVcIlxuICAgICAgW29uSXRlbUNsaWNrXT1cInVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbi5vbkl0ZW1DbGljayB8fCBkZWZhdWx0TWVudGlvbnNJdGVtQ2xpY2tIYW5kbGVyXCJcbiAgICAgIFt1c2Vyc1JlcXVlc3RCdWlsZGVyXT1cInVzZXJzUmVxdWVzdEJ1aWxkZXJcIlxuICAgICAgW3NlYXJjaEtleXdvcmRdPVwibWVudGlvbnNTZWFyY2hUZXJtXCJcbiAgICAgIFtzdWJ0aXRsZVZpZXddPVwidXNlck1lbWJlcldyYXBwZXJDb25maWd1cmF0aW9uLnN1YnRpdGxlVmlld1wiXG4gICAgICBbZGlzYWJsZVVzZXJzUHJlc2VuY2VdPVwidXNlck1lbWJlcldyYXBwZXJDb25maWd1cmF0aW9uLmRpc2FibGVVc2Vyc1ByZXNlbmNlXCJcbiAgICAgIFthdmF0YXJTdHlsZV09XCJ1c2VyTWVtYmVyV3JhcHBlckNvbmZpZ3VyYXRpb24uYXZhdGFyU3R5bGVcIlxuICAgICAgW2xpc3RJdGVtVmlld109XCJ1c2VyTWVtYmVyV3JhcHBlckNvbmZpZ3VyYXRpb24ubGlzdEl0ZW1WaWV3XCJcbiAgICAgIFtzdGF0dXNJbmRpY2F0b3JTdHlsZV09XCJ1c2VyTWVtYmVyV3JhcHBlckNvbmZpZ3VyYXRpb24uc3RhdHVzSW5kaWNhdG9yU3R5bGVcIlxuICAgICAgW3VzZXJQcmVzZW5jZVBsYWNlbWVudF09XCJ1c2VyTWVtYmVyV3JhcHBlckNvbmZpZ3VyYXRpb24udXNlclByZXNlbmNlUGxhY2VtZW50XCJcbiAgICAgIFtoaWRlU2VwZXJhdG9yXT1cInVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbi5oaWRlU2VwYXJhdG9yXCJcbiAgICAgIFtsb2FkaW5nU3RhdGVWaWV3XT1cInVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbi5sb2FkaW5nU3RhdGVWaWV3XCJcbiAgICAgIFtvbkVtcHR5XT1cImRlZmF1bHRPbkVtcHR5Rm9yTWVudGlvbnNcIlxuICAgICAgW2xvYWRpbmdJY29uVXJsXT1cInVzZXJNZW1iZXJXcmFwcGVyQ29uZmlndXJhdGlvbi5sb2FkaW5nSWNvblVSTFwiXG4gICAgICBbZ3JvdXBdPVwiZ3JvdXBcIiBbZ3JvdXBNZW1iZXJSZXF1ZXN0QnVpbGRlcl09XCJncm91cE1lbWJlcnNSZXF1ZXN0QnVpbGRlclwiXG4gICAgICBbZGlzYWJsZUxvYWRpbmdTdGF0ZV09XCJ0cnVlXCJcbiAgICAgIFtvbkVycm9yXT1cImRlZmF1bHRPbkVtcHR5Rm9yTWVudGlvbnNcIj48L2NvbWV0Y2hhdC11c2VyLW1lbWJlci13cmFwcGVyPlxuXG4gICAgPGRpdiAqbmdJZj1cInNob3dNZW50aW9uc0NvdW50V2FybmluZ1wiXG4gICAgICBjbGFzcz1cImNjLW1lc3NhZ2Vjb21wb3Nlcl9fbWVudGlvbnMtbGltaXQtZXhjZWVkZWRcIj5cbiAgICAgIDxjb21ldGNoYXQtaWNvbi1idXR0b25cbiAgICAgICAgW3RleHRdPVwibWVudGlvbnNXYXJuaW5nVGV4dCB8fCBsb2NhbGl6ZSgnTUVOVElPTlNfTElNSVRfV0FSTklOR19NRVNTQUdFJylcIlxuICAgICAgICBbaWNvblVSTF09XCJJbmZvU2ltcGxlSWNvblwiXG4gICAgICAgIFtidXR0b25TdHlsZV09XCJnZXRNZW50aW9uSW5mb0ljb25TdHlsZSgpXCI+PC9jb21ldGNoYXQtaWNvbi1idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjYy1tZXNzYWdlLWNvbXBvc2VyX19oZWFkZXItdmlld1wiXG4gICAgKm5nSWY9XCJoZWFkZXJWaWV3OyBlbHNlIG1lc3NhZ2VQcmV2aWV3XCI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJWaWV3O2NvbnRleHQ6eyAkaW1wbGljaXQ6IHVzZXIgPz8gZ3JvdXAsIGNvbXBvc2VySWQ6Y29tcG9zZXJJZCB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuICA8bmctdGVtcGxhdGUgI21lc3NhZ2VQcmV2aWV3PlxuICAgIDxkaXYgY2xhc3M9XCJjYy1tZXNzYWdlLWNvbXBvc2VyX19oZWFkZXItdmlld1wiICpuZ0lmPVwic2hvd1ByZXZpZXdcIj5cbiAgICAgIDxjb21ldGNoYXQtcHJldmlldyBbcHJldmlld1N0eWxlXT1cInByZXZpZXdTdHlsZVwiXG4gICAgICAgIFtwcmV2aWV3U3VidGl0bGVdPVwiZWRpdFByZXZpZXdUZXh0XCJcbiAgICAgICAgKGNjLXByZXZpZXctY2xvc2UtY2xpY2tlZCk9XCJjbG9zZVByZXZpZXcoKVwiPiA8L2NvbWV0Y2hhdC1wcmV2aWV3PlxuICAgIDwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9faW5wdXRcIj5cblxuICAgIDxjb21ldGNoYXQtdGV4dC1pbnB1dCAoY2MtdGV4dC1pbnB1dC1lbnRlcmVkKT1cInNlbmRNZXNzYWdlT25FbnRlcigkZXZlbnQpXCJcbiAgICAgICNpbnB1dFJlZiBbdGV4dF09XCJ0ZXh0XCJcbiAgICAgIChjYy10ZXh0LWlucHV0LWNoYW5nZWQpPVwibWVzc2FnZUlucHV0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgIFt0ZXh0SW5wdXRTdHlsZV09XCJ0ZXh0SW5wdXRTdHlsZVwiIFtwbGFjZWhvbGRlclRleHRdPVwicGxhY2Vob2xkZXJUZXh0XCJcbiAgICAgIFthdXhpbGlhcnlCdXR0b25BbGlnbm1lbnRdPVwiYXV4aWxpYXJ5QnV0dG9uc0FsaWdubWVudFwiXG4gICAgICBbdGV4dEZvcm1hdHRlcnNdPVwidGV4dEZvcm1hdHRlcnNcIj5cblxuICAgICAgPGRpdiBkYXRhLXNsb3Q9XCJzZWNvbmRhcnlWaWV3XCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRhcnlCdXR0b25WaWV3O2Vsc2Ugc2Vjb25kYXJ5QnV0dG9uXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWNvbmRhcnlCdXR0b25WaWV3O2NvbnRleHQ6eyAkaW1wbGljaXQ6IHVzZXIgPz8gZ3JvdXAsIGNvbXBvc2VySWQ6Y29tcG9zZXJJZCB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctdGVtcGxhdGUgI3NlY29uZGFyeUJ1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fYXR0YWNoYnV0dG9uXCI+XG4gICAgICAgICAgICA8Y29tZXRjaGF0LXBvcG92ZXJcbiAgICAgICAgICAgICAgKGNjLXBvcG92ZXItb3V0c2lkZS1jbGljayk9XCJvcGVuQWN0aW9uU2hlZXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIFtwbGFjZW1lbnRdPVwiYXV4aWxhcnlQbGFjZW1lbnRcIiBbcG9wb3ZlclN0eWxlXT1cInBvcG92ZXJTdHlsZVwiPlxuICAgICAgICAgICAgICA8Y29tZXRjaGF0LWFjdGlvbi1zaGVldCBzbG90PVwiY29udGVudFwiIFthY3Rpb25zXT1cImNvbXBvc2VyQWN0aW9uc1wiXG4gICAgICAgICAgICAgICAgW2FjdGlvblNoZWV0U3R5bGVdPVwiYWN0aW9uU2hlZXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgKGNjLWFjdGlvbnNoZWV0LWNsaWNrZWQpPVwiaGFuZGxlQWN0aW9ucygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDwvY29tZXRjaGF0LWFjdGlvbi1zaGVldD5cbiAgICAgICAgICAgICAgPGNvbWV0Y2hhdC1idXR0b24gI2FjdGlvblNoZWV0UmVmIHNsb3Q9XCJjaGlsZHJlblwiXG4gICAgICAgICAgICAgICAgKGNjLWJ1dHRvbi1jbGlja2VkKT1cIm9wZW5BY3Rpb25TaGVldCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbaWNvblVSTF09XCIhc2hvd0FjdGlvblNoZWV0SXRlbSB8fCAoc2hvd0Vtb2ppS2V5Ym9hcmQgJiYgIXNob3dBY3Rpb25TaGVldEl0ZW0pICA/IGF0dGFjaG1lbnRJY29uVVJMICA6IGNsb3NlQnV0dG9uSWNvblVSTFwiXG4gICAgICAgICAgICAgICAgW2J1dHRvblN0eWxlXT1cImF0dGFjaG1lbnRCdXR0b25TdHlsZVwiPjwvY29tZXRjaGF0LWJ1dHRvbj5cbiAgICAgICAgICAgIDwvY29tZXRjaGF0LXBvcG92ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImNjLW1lc3NhZ2UtY29tcG9zZXJfX2F1eGlsaWFyeVwiIGRhdGEtc2xvdD1cImF1eGlsYXJ5Vmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fY3VzdG9tLWF1eGlsaWFyeS12aWV3XCJcbiAgICAgICAgICAqbmdJZj1cImF1eGlsYXJ5QnV0dG9uVmlld1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYXV4aWxhcnlCdXR0b25WaWV3O2NvbnRleHQ6eyAkaW1wbGljaXQ6IHVzZXIgPz8gZ3JvdXAsIGNvbXBvc2VySWQ6Y29tcG9zZXJJZCB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIEFJIENhcmRzIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fc3RpY2tlcmtleWJvYXJkXCI+XG4gICAgICAgICAgPGNvbWV0Y2hhdC1wb3BvdmVyIChjYy1wb3BvdmVyLWNsaWNrKT1cIm9wZW5TdGlja2VyS2V5Ym9hcmQoJGV2ZW50KVwiXG4gICAgICAgICAgICBbcG9wb3ZlclN0eWxlXT1cImFpUG9wb3ZlclwiIFtwbGFjZW1lbnRdPVwiYXV4aWxhcnlQbGFjZW1lbnRcIj5cbiAgICAgICAgICAgIDxjb21ldGNoYXQtYWktY2FyZCBbc3RhdGVdPVwic21hcnRSZXBseVN0YXRlXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJzaG93U21hcnRSZXBseSAmJiAhc2hvd0FjdGlvblNoZWV0SXRlbUFJICYmICFzaG93QWlCb3RMaXN0XCJcbiAgICAgICAgICAgICAgc2xvdD1cImNvbnRlbnRcIiBbbG9hZGluZ1N0YXRlVGV4dF09XCJsb2FkaW5nU3RhdGVUZXh0XCJcbiAgICAgICAgICAgICAgW2VtcHR5U3RhdGVUZXh0XT1cImVtcHR5U3RhdGVUZXh0XCJcbiAgICAgICAgICAgICAgW2Vycm9yU3RhdGVUZXh0XT1cImVycm9yU3RhdGVUZXh0XCI+XG4gICAgICAgICAgICAgIDxkaXYgc2xvdD1cImxvYWRlZFZpZXdcIiBjbGFzcz1cInNtYXJ0LXJlcGxpZXMtd3JhcHBlclwiPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLW1lc3NhZ2UtY29tcG9zZXJfX3NtYXJ0cmVwbHktaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fYmFjay1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGNvbWV0Y2hhdC1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInJlcGxpZXNBcnJheSAmJiByZXBsaWVzQXJyYXkubGVuZ3RoID4gMCBcIlxuICAgICAgICAgICAgICAgICAgICAgIFtpY29uVVJMXT1cImJhY2tCdXR0b25JY29uVVJMXCJcbiAgICAgICAgICAgICAgICAgICAgICAoY2MtYnV0dG9uLWNsaWNrZWQpPVwib25BaUJhY2tCdXR0b25DbGljaygpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbYnV0dG9uU3R5bGVdPVwiYmFja0J1dHRvblN0eWxlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9jb21ldGNoYXQtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fc21hcnRyZXBseS1oZWFkZXItdmlld1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD57eyBsb2NhbGl6ZShcIlNVR0dFU1RfQV9SRVBMWVwiKSB9fTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLW1lc3NhZ2UtY29tcG9zZXJfX3NtYXJ0cmVwbHktY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgPHNtYXJ0LXJlcGxpZXNcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyZXBsaWVzQXJyYXkgJiYgcmVwbGllc0FycmF5Lmxlbmd0aCA+IDAgXCJcbiAgICAgICAgICAgICAgICAgICAgW3NtYXJ0UmVwbHlTdHlsZV09XCJzbWFydFJlcGx5U3R5bGVcIiBbcmVwbGllc109XCJyZXBsaWVzQXJyYXlcIlxuICAgICAgICAgICAgICAgICAgICBbY2xvc2VJY29uVVJMXT1cIicnXCIgKGNjLXJlcGx5LWNsaWNrZWQpPVwic2VuZFJlcGx5KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgIDwvc21hcnQtcmVwbGllcz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG5cblxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9jb21ldGNoYXQtYWktY2FyZD5cblxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dBaUJvdExpc3QgICYmICFzaG93QWN0aW9uU2hlZXRJdGVtQUlcIlxuICAgICAgICAgICAgICBzbG90PVwiY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fYWlib3RsaXN0XCI+XG4gICAgICAgICAgICAgICAgPGNvbWV0Y2hhdC1idXR0b24gKm5nSWY9XCIgYWlCb3RMaXN0ICYmIGFpQm90TGlzdC5sZW5ndGg+IDEgXCJcbiAgICAgICAgICAgICAgICAgIFtpY29uVVJMXT1cImJhY2tCdXR0b25JY29uVVJMXCJcbiAgICAgICAgICAgICAgICAgIChjYy1idXR0b24tY2xpY2tlZCk9XCJvbkFpQmFja0J1dHRvbkNsaWNrKClcIlxuICAgICAgICAgICAgICAgICAgW2J1dHRvblN0eWxlXT1cImJhY2tCdXR0b25TdHlsZSgpXCI+XG4gICAgICAgICAgICAgICAgPC9jb21ldGNoYXQtYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxwPnt7IGxvY2FsaXplKFwiQ09NRVRDSEFUX0FTS19BSV9CT1RcIikgfX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8Y29tZXRjaGF0LWFjdGlvbi1zaGVldFxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0FpQm90TGlzdCAgJiYgIXNob3dBY3Rpb25TaGVldEl0ZW1BSVwiIHNsb3Q9XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICBbYWN0aW9uc109XCJhaUFjdGlvbkJ1dHRvbnNcIiBbdGl0bGVdPVwiJ0FJJ1wiXG4gICAgICAgICAgICAgICAgW2FjdGlvblNoZWV0U3R5bGVdPVwiYWlBY3Rpb25TaGVldFN0eWxlXCIgW2hpZGVMYXlvdXRNb2RlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIChjYy1hY3Rpb25zaGVldC1jbGlja2VkKT1cImhhbmRsZUFjdGlvbnMoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICA8L2NvbWV0Y2hhdC1hY3Rpb24tc2hlZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGNvbWV0Y2hhdC1hY3Rpb24tc2hlZXQgKm5nSWY9XCJzaG93QWN0aW9uU2hlZXRJdGVtQUlcIiBzbG90PVwiY29udGVudFwiXG4gICAgICAgICAgICAgIFthY3Rpb25zXT1cImJ1dHRvbnNcIiBbdGl0bGVdPVwiJ0FJJ1wiXG4gICAgICAgICAgICAgIFthY3Rpb25TaGVldFN0eWxlXT1cImFpQWN0aW9uU2hlZXRTdHlsZVwiIFtoaWRlTGF5b3V0TW9kZV09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgKGNjLWFjdGlvbnNoZWV0LWNsaWNrZWQpPVwiaGFuZGxlQWN0aW9ucygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L2NvbWV0Y2hhdC1hY3Rpb24tc2hlZXQ+XG5cbiAgICAgICAgICAgIDxjb21ldGNoYXQtYnV0dG9uICpuZ0lmPVwiaXNBaUVuYWJsZWRcIiBbaG92ZXJUZXh0XT1cImxvY2FsaXplKCdBSScpXCJcbiAgICAgICAgICAgICAgc2xvdD1cImNoaWxkcmVuXCIgI2FpQnV0dG9uUmVmXG4gICAgICAgICAgICAgIChjYy1idXR0b24tY2xpY2tlZCk9XCJvcGVuQWlGZWF0dXJlcygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgW2ljb25VUkxdPVwiIXNob3dBaUZlYXR1cmVzID8gYWlJY29uVVJMIDogY2xvc2VCdXR0b25JY29uVVJMXCJcbiAgICAgICAgICAgICAgW2J1dHRvblN0eWxlXT1cInN0aWNrZXJCdXR0b25TdHlsZVwiPjwvY29tZXRjaGF0LWJ1dHRvbj5cbiAgICAgICAgICA8L2NvbWV0Y2hhdC1wb3BvdmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fc3RpY2tlcmtleWJvYXJkXCJcbiAgICAgICAgICAqbmdJZj1cImVuYWJsZVN0aWNrZXJLZXlib2FyZFwiPlxuICAgICAgICAgIDxjb21ldGNoYXQtcG9wb3ZlclxuICAgICAgICAgICAgKGNjLXBvcG92ZXItb3V0c2lkZS1jbGljayk9XCJvcGVuU3RpY2tlcktleWJvYXJkKCRldmVudClcIlxuICAgICAgICAgICAgW3BvcG92ZXJTdHlsZV09XCJzdGlja2VyUG9wb3ZlclwiIFtwbGFjZW1lbnRdPVwiYXV4aWxhcnlQbGFjZW1lbnRcIj5cbiAgICAgICAgICAgIDxzdGlja2Vycy1rZXlib2FyZCBzbG90PVwiY29udGVudFwiXG4gICAgICAgICAgICAgIFtzdGlja2VyU3R5bGVdPVwic3RpY2tlcktleWJvYXJkU3R5bGVcIlxuICAgICAgICAgICAgICAoY2Mtc3RpY2tlci1jbGlja2VkKT1cInNlbmRTdGlja2VyKCRldmVudClcIj5cbiAgICAgICAgICAgIDwvc3RpY2tlcnMta2V5Ym9hcmQ+XG4gICAgICAgICAgICA8Y29tZXRjaGF0LWJ1dHRvbiBbaG92ZXJUZXh0XT1cImxvY2FsaXplKCdTVElDS0VSJylcIiBzbG90PVwiY2hpbGRyZW5cIlxuICAgICAgICAgICAgICAjc3RpY2tlckJ1dHRvblJlZlxuICAgICAgICAgICAgICAoY2MtYnV0dG9uLWNsaWNrZWQpPVwib3BlblN0aWNrZXJLZXlib2FyZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgW2ljb25VUkxdPVwiICFzaG93U3RpY2tlcktleWJvYXJkID8gc3RpY2tlckJ1dHRvbkljb25VUkwgOiBjbG9zZUJ1dHRvbkljb25VUkxcIlxuICAgICAgICAgICAgICBbYnV0dG9uU3R5bGVdPVwic3RpY2tlckJ1dHRvblN0eWxlXCI+PC9jb21ldGNoYXQtYnV0dG9uPlxuICAgICAgICAgIDwvY29tZXRjaGF0LXBvcG92ZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fZW1vamlrZXlib2FyZFwiPlxuICAgICAgICAgIDxjb21ldGNoYXQtcG9wb3ZlclxuICAgICAgICAgICAgKGNjLXBvcG92ZXItb3V0c2lkZS1jbGljayk9XCJvcGVuRW1vamlLZXlib2FyZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtwbGFjZW1lbnRdPVwiYXV4aWxhcnlQbGFjZW1lbnRcIiBbcG9wb3ZlclN0eWxlXT1cImVtb2ppUG9wb3ZlclwiPlxuICAgICAgICAgICAgPGNvbWV0Y2hhdC1lbW9qaS1rZXlib2FyZCBzbG90PVwiY29udGVudFwiXG4gICAgICAgICAgICAgIFtlbW9qaUtleWJvYXJkU3R5bGVdPVwiZW1vamlLZXlib2FyZFN0eWxlXCJcbiAgICAgICAgICAgICAgKGNjLWVtb2ppLWNsaWNrZWQpPVwiYXBwZW5kRW1vamkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9jb21ldGNoYXQtZW1vamkta2V5Ym9hcmQ+XG4gICAgICAgICAgICA8Y29tZXRjaGF0LWJ1dHRvbiAjZW1vamlCdXR0b25SZWYgW2hvdmVyVGV4dF09XCJsb2NhbGl6ZSgnRU1PSkknKVwiXG4gICAgICAgICAgICAgIHNsb3Q9XCJjaGlsZHJlblwiIChjYy1idXR0b24tY2xpY2tlZCk9XCJvcGVuRW1vamlLZXlib2FyZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgW2ljb25VUkxdPVwiICFzaG93RW1vamlLZXlib2FyZCAgfHwgKCFzaG93RW1vamlLZXlib2FyZCAmJiBzaG93QWN0aW9uU2hlZXRJdGVtKSA/IGVtb2ppQnV0dG9uSWNvblVSTCA6IGNsb3NlQnV0dG9uSWNvblVSTFwiXG4gICAgICAgICAgICAgIFtidXR0b25TdHlsZV09XCJlbW9qaUJ1dHRvblN0eWxlXCI+PC9jb21ldGNoYXQtYnV0dG9uPlxuICAgICAgICAgIDwvY29tZXRjaGF0LXBvcG92ZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fbWVkaWFyZWNvcmRlclwiXG4gICAgICAgICAgKm5nSWY9XCIhaGlkZVZvaWNlUmVjb3JkaW5nXCI+XG4gICAgICAgICAgPGNvbWV0Y2hhdC1wb3BvdmVyIFtjbG9zZU9uT3V0c2lkZUNsaWNrXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFtwb3BvdmVyU3R5bGVdPVwibWVkaWFSZWNvcmRlZFBvcG92ZXJcIlxuICAgICAgICAgICAgW3BsYWNlbWVudF09XCJhdXhpbGFyeVBsYWNlbWVudFwiPlxuXG4gICAgICAgICAgICA8Y29tZXRjaGF0LW1lZGlhLXJlY29yZGVyICpuZ0lmPVwidG9nZ2xlTWVkaWFSZWNvcmRlZFwiXG4gICAgICAgICAgICAgIFthdXRvUmVjb3JkaW5nXT1cInRydWVcIiBzdGFydEljb25UZXh0PVwiXCIgc3RvcEljb25UZXh0PVwiXCJcbiAgICAgICAgICAgICAgc3VibWl0QnV0dG9uSWNvblRleHQ9XCJcIlxuICAgICAgICAgICAgICBbc3VibWl0QnV0dG9uSWNvblVSTF09XCJ2b2ljZVJlY29yZGluZ1N1Ym1pdEljb25VUkxcIlxuICAgICAgICAgICAgICBbc3RhcnRJY29uVVJMXT1cInZvaWNlUmVjb3JkaW5nU3RhcnRJY29uVVJMXCJcbiAgICAgICAgICAgICAgW3N0b3BJY29uVVJMXT1cInZvaWNlUmVjb3JkaW5nU3RvcEljb25VUkxcIlxuICAgICAgICAgICAgICBbY2xvc2VJY29uVVJMXT1cInZvaWNlUmVjb3JkaW5nQ2xvc2VJY29uVVJMXCJcbiAgICAgICAgICAgICAgKGNjLW1lZGlhLXJlY29yZGVyLXN1Ym1pdHRlZCk9XCJzZW5kUmVjb3JkZWRNZWRpYSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGNjLW1lZGlhLXJlY29yZGVyLWNsb3NlZCk9XCJjbG9zZU1lZGlhUmVjb3JkZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIHNsb3Q9XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgW21lZGlhUGxheWVyU3R5bGVdPVwibWVkaWFSZWNvcmRlclN0eWxlXCI+PC9jb21ldGNoYXQtbWVkaWEtcmVjb3JkZXI+XG4gICAgICAgICAgICA8Y29tZXRjaGF0LWljb24tYnV0dG9uIFtob3ZlclRleHRdPVwibG9jYWxpemUoJ1ZPSUNFX1JFQ09SRElORycpXCJcbiAgICAgICAgICAgICAgc2xvdD1cImNoaWxkcmVuXCIgI21lZGlhUmVjb3JkZWRSZWZcbiAgICAgICAgICAgICAgKGNjLWJ1dHRvbi1jbGlja2VkKT1cIm9wZW5NZWRpYVJlY29yZGVkKCRldmVudClcIlxuICAgICAgICAgICAgICBbaWNvblVSTF09XCIgIXRvZ2dsZU1lZGlhUmVjb3JkZWQgPyB2b2ljZVJlY29yZGluZ0ljb25VUkwgOiBjbG9zZUJ1dHRvbkljb25VUkxcIlxuICAgICAgICAgICAgICBbYnV0dG9uU3R5bGVdPVwibWVkaWFSZWNvcmRlckJ1dHRvblN0eWxlXCI+PC9jb21ldGNoYXQtaWNvbi1idXR0b24+XG4gICAgICAgICAgPC9jb21ldGNoYXQtcG9wb3Zlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZGF0YS1zbG90PVwicHJpbWFyeVZpZXdcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlbmRCdXR0b25WaWV3O2Vsc2Ugc2VuZEJ1dHRvblwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNzZW5kQnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYy1tZXNzYWdlLWNvbXBvc2VyX19zZW5kYnV0dG9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwic2hvd1NlbmRCdXR0b24gfHwgaGlkZUxpdmVSZWFjdGlvblwiPlxuICAgICAgICAgICAgPGNvbWV0Y2hhdC1idXR0b24gW2ljb25VUkxdPVwic2VuZEJ1dHRvbkljb25VUkxcIlxuICAgICAgICAgICAgICBbYnV0dG9uU3R5bGVdPVwic2VuZEJ1dHRvblN0eWxlXCJcbiAgICAgICAgICAgICAgW2hvdmVyVGV4dF09XCJsb2NhbGl6ZSgnU0VORF9NRVNTQUdFJylcIlxuICAgICAgICAgICAgICAoY2MtYnV0dG9uLWNsaWNrZWQpPVwiY3VzdG9tU2VuZE1ldGhvZChtZXNzYWdlVGV4dClcIj5cbiAgICAgICAgICAgIDwvY29tZXRjaGF0LWJ1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fbGl2ZXJlYWN0aW9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwiIWhpZGVMaXZlUmVhY3Rpb24gJiYgIXNob3dTZW5kQnV0dG9uXCI+XG4gICAgICAgICAgICA8Y29tZXRjaGF0LWJ1dHRvbiBbaWNvblVSTF09XCJMaXZlUmVhY3Rpb25JY29uVVJMXCJcbiAgICAgICAgICAgICAgW2hvdmVyVGV4dF09XCJsb2NhbGl6ZSgnTElWRV9SRUFDVElPTicpXCJcbiAgICAgICAgICAgICAgW2J1dHRvblN0eWxlXT1cImxpdmVSZWFjdGlvblN0eWxlXCJcbiAgICAgICAgICAgICAgKGNjLWJ1dHRvbi1jbGlja2VkKT1cInNlbmRSZWFjdGlvbigpXCI+PC9jb21ldGNoYXQtYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9jb21ldGNoYXQtdGV4dC1pbnB1dD5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPGlucHV0IGNsYXNzPVwiY2MtbWVzc2FnZS1jb21wb3Nlcl9fbWVkaWFpbnB1dFwiICNpbnB1dEVsZW1lbnRcbiAgKGNoYW5nZSk9XCJpbnB1dENoYW5nZUhhbmRsZXIoJGV2ZW50KVwiIC8+XG48Y29tZXRjaGF0LWJhY2tkcm9wICpuZ0lmPVwic2hvd0NyZWF0ZVBvbGxzXCIgW2JhY2tkcm9wU3R5bGVdPVwiYmFja2Ryb3BTdHlsZVwiPlxuICA8Y3JlYXRlLXBvbGwgW3VzZXJdPVwidXNlclwiIFtncm91cF09XCJncm91cFwiXG4gICAgKGNjLWNsb3NlLWNsaWNrZWQpPVwiY2xvc2VDcmVhdGVQb2xscygpXCJcbiAgICBbY3JlYXRlUG9sbFN0eWxlXT1cImNyZWF0ZVBvbGxTdHlsZVwiPjwvY3JlYXRlLXBvbGw+XG48L2NvbWV0Y2hhdC1iYWNrZHJvcD5cbiJdfQ==