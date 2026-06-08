import { apiGet, apiPost } from "./api";

export function getChatMessages(chatId) {
  return apiGet(`/chat/${chatId}`);
}

export function addChatMessage(message) {
  return apiPost("/chat", message);
}