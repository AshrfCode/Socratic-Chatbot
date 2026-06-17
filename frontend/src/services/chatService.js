import { apiGet, apiPost } from "./api";

export function getChatMessages(chatId) {
  return apiGet(`/chat/${chatId}`);
}

export function sendChatMessage(chatId, messageData) {
  return apiPost(`/chat/${chatId}/message`, messageData);
}

export function getChatHint(chatId, hintData) {
  return apiPost(`/chat/${chatId}/hint`, hintData);
}