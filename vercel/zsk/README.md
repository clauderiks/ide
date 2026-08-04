import { MastraClient } from '@mastra/client-js';
import { createContext, memo, useContext, useRef, useState, useEffect, useCallback, useLayoutEffect, Fragment as Fragment$1 } from 'react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { v4 } from '@lukeed/uuid';
import { AIV5Adapter } from '@mastra/core/agent/message-list';
import { ChevronDownIcon, CheckIcon, CopyIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { TooltipProvider, Root, TooltipPortal, TooltipContent as TooltipContent$1, TooltipTrigger as TooltipTrigger$1 } from '@radix-ui/react-tooltip';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { codeToHast } from 'shiki/bundle/web';

// src/mastra-client-context.tsx
var MastraClientContext = createContext({});
var MastraClientProvider = ({
  những đứa trẻ,
  baseUrl,
  tiêu đề,
  apiPrefix,
  thông tin xác thực = "bao gồm",
  customFetch
}) => {
  const client = createMastraClient(baseUrl, headers, apiPrefix, credentials, customFetch);
  return /* @__PURE__ */ jsx(MastraClientContext.Provider, { value: client, children });
};
var useMastraClient = () => useContext(MastraClientContext);
var IPV4_LOOPBACK_RE = /^127\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var isIPv4Loopback = (hostname) => {
  const m = IPV4_LOOPBACK_RE.exec(hostname);
  nếu (!m) trả về false;
  return +m[1] <= 255 && +m[2] <= 255 && +m[3] <= 255;
};
var isLocalUrl = (url) => {
  nếu (!url) trả về true;
  thử {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname.endsWith(".localhost") || isIPv4Loopback(hostname) || hostname === "::1" || hostname === "[::1]";
  } nắm lấy {
    Trả về false;
  }
};
var createMastraClient = (baseUrl, mastraClientHeaders = {}, apiPrefix, credentials = "include", customFetch) => {
  trả về MastraClient mới({
    baseUrl: baseUrl || "",
    tiêu đề: isLocalUrl(baseUrl) ? { ...mastraClientHeaders, "x-mastra-dev-playground": "true" } : mastraClientHeaders,
    apiPrefix,
    thông tin xác thực,
    lấy: customFetch
  });
};
var MastraReactProvider = ({
  những đứa trẻ,
  baseUrl,
  tiêu đề,
  apiPrefix,
  thông tin xác thực,
  customFetch
}) => {
  trả về /* @__PURE__ */ jsx(
    MastraClientProvider,
    {
      baseUrl,
      tiêu đề,
      apiPrefix,
      thông tin xác thực,
      customFetch,
      những đứa trẻ
    }
  );
};

// src/lib/mastra-db/formatCompletionFeedback.ts
var formatBaseCompletionFeedback = (result, maxIterationReached, formatScorerHeading, incompleteMessage) => {
  const lines = [];
  lines.push("#### Kết quả kiểm tra hoàn thành");
  lines.push("");
  lines.push(`Tổng thể: ${result.complete ? "\u2705 HOÀN THÀNH" : "\u274C CHƯA HOÀN THÀNH"}`);
  lines.push(`Thời lượng: ${result.totalDuration}ms`);
  nếu (result.timedOut) {
    lines.push("\u26A0\uFE0F Thời gian tính điểm đã hết");
  }
  lines.push("");
  for (const scorer of result.scorers) {
    lines.push(formatScorerHeading(scorer));
    lines.push(`Điểm: ${scorer.score} ${scorer.passed ? "\u2705" : "\u274C"}`);
    nếu (người ghi điểm.lý do) {
      lines.push(`Lý do: ${scorer.reason}`);
    }
    lines.push("");
  }
  nếu (result.complete) {
    lines.push("\u2705 Nhiệm vụ đã hoàn thành.");
  } else if (maxIterationReached) {
    lines.push("\u26A0\uFE0F Đã đạt số lần lặp tối đa.");
  } khác {
    lines.push(incompleteMessage);
  }
  return lines.join("\n");
};
var formatCompletionFeedback = (result, maxIterationReached) => {
  trả về định dạng BaseCompletionFeedback(
    kết quả,
    Đã đạt số lần lặp tối đa.
    (người ghi bàn) => `###### ${scorer.scorerName} (${scorer.scorerId})`,
    "\u{1F504} Sẽ tiếp tục thực hiện nhiệm vụ."
  );
};
var formatStreamCompletionFeedback = (result, maxIterationReached) => {
  trả về định dạng BaseCompletionFeedback(
    kết quả,
    Đã đạt số lần lặp tối đa.
    (người ghi bàn) => `**${scorer.scorerName}** (${scorer.scorerId})`,
    "\u{1F504} Nhiệm vụ vẫn chưa hoàn thành. Vui lòng tiếp tục làm việc dựa trên phản hồi ở trên."
  );
};

// src/lib/mastra-db/types.ts
var CLIENT_MESSAGE_ID_KEY = "clientMessageId";

// src/lib/mastra-db/accumulator.ts
var cloneMetadata = (siêu dữ liệu) => siêu dữ liệu? { ...siêu dữ liệu } : {};
var withParts = (message, parts) => ({
  ...tin nhắn,
  nội dung: {
    ...nội dung tin nhắn,
    các bộ phận
  }
});
var withMetadata = (message, metadata) => ({
  ...tin nhắn,
  nội dung: {
    ...nội dung tin nhắn,
    siêu dữ liệu
  }
});
var clearPendingStatus = (tin nhắn) => {
  const { status: _status, [CLIENT_MESSAGE_ID_KEY]: _clientMessageId, ...rest } = message.content.metadata ?? {};
  trả về withMetadata(message, rest);
};
var clearPendingStatusKeepClientId = (tin nhắn) => {
  const { status: _status, ...rest } = message.content.metadata ?? {};
  trả về withMetadata(message, rest);
};
var replaceLast = (conversation, message) => [
  ...cuộc trò chuyện.cắt lát(0, -1),
  tin nhắn
];
var replaceAt = (conversation, index, message) => [
  ...cuộc hội thoại.cắt lát (0, chỉ mục),
  tin nhắn,
  ...conversation.slice(index + 1)
];
var newAssistantMessage = (id, parts, metadata) => ({
  nhận dạng,
  Vai trò: "trợ lý",
  createdAt: /* @__PURE__ */ new Date(),
  nội dung: {
    định dạng: 2,
    các bộ phận,
    siêu dữ liệu: cloneMetadata(metadata)
  }
});
var appendAssistantMessage = (conversation, id, parts, metadata) => [...conversation, newAssistantMessage(id, parts, metadata)];
var isToolPart = (part) => part.type === "tool-invocation";
var partTextId = (part) => part.type === "text" ? part.textId : void 0;
var partState = (part) => part.state;
var finishStreamingAssistantMessage = (conversation) => {
  const lastMessage = conversation[conversation.length - 1];
  if (!lastMessage || lastMessage.role !== "assistant") return conversation;
  if (lastMessage.content.parts.length === 0) return conversation.slice(0, -1);
  const nextParts = lastMessage.content.parts.map((part) => {
    nếu ((part.type === "text" || part.type === "reasoning") && partState(part) === "streaming") {
      trở lại {
        ...phần,
        Trạng thái: "đã hoàn thành"
      };
    }
    trả lại một phần;
  });
  return replaceLast(conversation, withParts(lastMessage, nextParts));
};
var locateToolPart = (messages, toolCallId, allowMetadataOnlyMatch) => {
  const findIndex = (parts) => parts.findIndex((part) => isToolPart(part) && part.toolInvocation.toolCallId === toolCallId);
  const lastMessage = messages[messages.length - 1];
  nếu (lastMessage && lastMessage.role === "assistant") {
    const idx = findIndex(lastMessage.content.parts);
    if (idx !== -1) return { messageIndex: messages.length - 1, toolPartIndex: idx };
  }
  let count = 0;
  const maxMessagesBack = 10;
  for (let i = messages.length - 1; i >= 0; i--) {
    nếu (count > maxMessagesBack) thì thoát;
    const message = messages[i];
    nếu (message.role khác "assistant") thì tiếp tục;
    const idx = findIndex(message.content.parts);
    if (idx !== -1) return { messageIndex: i, toolPartIndex: idx };
    đếm++;
  }
  nếu (!allowMetadataOnlyMatch) trả về null;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") return { messageIndex: i, toolPartIndex: -1 };
  }
  trả về null;
};
var mergeBgTaskMetadata = (existing, mode, args, otherMetadata) => {
  const base = cloneMetadata(existing);
  const existingBgTasks = base.backgroundTasks ?? {};
  const nextBgTasks = { ...existingBgTasks };
  nếu (args.perTaskEntry) {
    const { toolCallId, startedAt, completedAt, taskId, suspendedAt } = args.perTaskEntry;
    const prev = existingBgTasks[toolCallId] ?? { taskId };
    nextBgTasks[toolCallId] = {
      ...trước đó,
      taskId,
      ...startedAt !== void 0 ? { startedAt } : {},
      ...completedAt !== void 0 ? { completedAt } : {},
      ...suspendedAt !== void 0 ? { suspendedAt } : {}
    };
  }
  const merged = {
    ...căn cứ,
    ...otherMetadata ?? {},
    cách thức,
    backgroundTasks: nextBgTasks
  };
  if (args.resetRunningCount) merged.runningBackgroundTasksCount = void 0;
  trả về giá trị đã hợp nhất;
};
var mapWorkflowStreamChunkToWatchResult = (prev, chunk) => {
  nếu (chunk.type === "workflow-start") {
    trở lại {
      đầu vào: prev?.input,
      Trạng thái: "đang chạy",
      các bước: prev?.các bước || {}
    };
  }
  nếu (chunk.type === "workflow-canceled") {
    return { ...prev, status: "canceled" };
  }
  nếu (chunk.type === "workflow-finish") {
    const finalStatus = chunk.payload.workflowStatus;
    const prevSteps = prev?.steps ?? {};
    const lastStep = Object.values(prevSteps).pop();
    trở lại {
      ...trước đó,
      trạng thái: chunk.payload.workflowStatus,
      ...finalStatus === "thành công" && lastStep?.status === "thành công" ? { result: lastStep?.output } : finalStatus === "thất bại" && lastStep?.status === "thất bại" ? { error: lastStep?.error } : finalStatus === "tripwire" && chunk.payload.tripwire ? { tripwire: chunk.payload.tripwire } : {}
    };
  }
  const { stepCallId: _stepCallId, stepName: _stepName, ...newPayload } = chunk.payload ?? {};
  const newSteps = {
    ...các bước trước đó?
    [chunk.payload.id]: {
      ...các bước trước đó?.[chunk.payload.id],
      ...tải trọng mới
    }
  };
  if (chunk.type === "workflow-step-start") return { ...prev, steps: newSteps };
  nếu (chunk.type === "workflow-step-suspended") {
    const suspendedStepIds = Object.entries(newSteps).flatMap(
      ([stepId, stepResult]) => {
        nếu (stepResult?.status === "đã tạm dừng") {
          const nestedPath = stepResult?.suspendPayload?.__workflow_meta?.path;
          return nestedPath ? [[stepId, ...nestedPath]] : [[stepId]];
        }
        trở lại [];
      }
    );
    trở lại {
      ...trước đó,
      Trạng thái: "đã tạm ngừng",
      các bước: newSteps,
      suspendPayload: chunk.payload.suspendPayload,
      bị đình chỉ: suspendedStepIds
    };
  }
  if (chunk.type === "workflow-step-waiting") return { ...prev, status: "waiting", steps: newSteps };
  nếu (chunk.type === "workflow-step-progress") {
    trở lại {
      ...trước đó,
      các bước: {
        ...các bước trước đó?
        [chunk.payload.id]: {
          ...các bước trước đó?.[chunk.payload.id],
          foreachProgress: {
            completedCount: chunk.payload.completedCount,
            totalCount: chunk.payload.totalCount,
            currentIndex: chunk.payload.currentIndex,
            iterationStatus: chunk.payload.iterationStatus,
            iterationOutput: chunk.payload.iterationOutput
          }
        }
      }
    };
  }
  if (chunk.type === "workflow-step-result") return { ...prev, steps: newSteps };
  trả về giá trị trước đó;
};
var signalContentsToUserMessages = (contents, metadata) => {
  const makeUserMessage = (parts2) => ({
    id: `signal-${Date.now()}`,
    Vai trò: "người dùng",
    createdAt: /* @__PURE__ */ new Date(),
    nội dung: {
      định dạng: 2,
      các bộ phận: parts2,
      siêu dữ liệu: cloneMetadata(metadata)
    }
  });
  const toMessagePart = (part) => {
    if (!part || typeof part !== "object") return [];
    const typedPart = part;
    if (typeof typedPart.type === "text" && typeof typedPart.text === "string") {
      return [{ type: "text", text: typedPart.text }];
    }
    nếu (typedPart.type === "image") {
      const image = typedPart.image;
      trở lại [
        {
          loại: "tệp tin",
          mediaType: typeof typedPart.mediaType === "string" ? typedPart.mediaType : typeof typedPart.mimeType === "string" ? typedPart.mimeType : "image/*",
          url: typeof image === "string" ? image : image instanceof URL ? image.toString() : ""
        }
      ];
    }
    nếu (typedPart.type === "file") {
      const data = typedPart.data;
      trở lại [
        {
          loại: "tệp tin",
          mediaType: typeof typedPart.mediaType === "string" ? typedPart.mediaType : typeof typedPart.mimeType === "string" ? typedPart.mimeType : "application/octet-stream",
          url: typeof data === "string" ? data : data instanceof URL ? data.toString() : "",
          ...typeof typedPart.filename === "string" ? { filename: typedPart.filename } : {}
        }
      ];
    }
    trở lại [];
  };
  nếu (typeof contents === "string") {
    return [makeUserMessage([{ type: "text", text: contents }])];
  }
  nếu (Array.isArray(contents)) {
    const parts2 = contents.flatMap(toMessagePart);
    return parts2.length ? [makeUserMessage(parts2)] : contents.flatMap((content2) => signalContentsToUserMessages(content2, metadata));
  }
  if (!contents || typeof contents !== "object") return [];
  const message = contents;
  if (message.role && message.role !== "user") return [];
  const content = message.content;
  nếu (typeof content === "string") {
    return [makeUserMessage([{ type: "text", text: content }])];
  }
  if (!Array.isArray(content)) return [];
  const parts = content.flatMap(toMessagePart);
  return parts.length ? [makeUserMessage(parts)] : [];
};
var makeToolInvocationPart = (invocation) => ({
  loại: "khởi tạo công cụ",
  toolInvocation: invocation
});
var isTemplateLiteralPassthrough = (chunk) => chunk.type.startsWith("agent-execution-event-") || chunk.type.startsWith("workflow-execution-event-");
var isDataChunk = (chunk) => chunk.type.startsWith("data-");
var accumulateChunk = ({ chunk, conversation, metadata }) => {
  const result = [...cuộc hội thoại];
  nếu (isTemplateLiteralPassthrough(chunk)) {
    Trả về kết quả;
  }
  nếu (isDataChunk(chunk)) {
    if (chunk.type === "data-user-message" && "data" in chunk && (chunk.data?.type === "user-message" || chunk.data?.type === "user")) {
      const signalId = chunk.data.id;
      const echoedClientMessageId = chunk.data?.metadata?.[CLIENT_MESSAGE_ID_KEY];
      nếu (typeof echoedClientMessageId === "string" && result.some(
        (message) => message.content.metadata?.status === "pending" && message.content.metadata[CLIENT_MESSAGE_ID_KEY] === echoedClientMessageId
      )) {
        trả về finishStreamingAssistantMessage(
          result.map(
            (message) => message.content.metadata?.status === "pending" && message.content.metadata[CLIENT_MESSAGE_ID_KEY] === echoedClientMessageId ? clearPendingStatusKeepClientId(typeof signalId === "string" ? { ...message, id: signalId } : message) : message
          )
        );
      }
      if (typeof signalId === "string" && result.some((message) => message.id === signalId)) {
        trả về finishStreamingAssistantMessage(
          result.map(
            (message) => message.id === signalId && message.content.metadata?.status === "pending" ? clearPendingStatus(message) : message
          )
        );
      }
      const userMessages = signalContentsToUserMessages(chunk.data.contents, metadata);
      if (!userMessages.length) return result;
      const conversationWithFinishedAssistant = finishStreamingAssistantMessage(result);
      const messageIdPrefix = typeof signalId === "string" ? signalId : `signal-${chunk.runId}-${Date.now()}`;
      trở lại [
        ...cuộc trò chuyện với trợ lý đã hoàn thành,
        ...userMessages.map((message, index) => ({
          ...tin nhắn,
          id: index === 0 ? messageIdPrefix : `${messageIdPrefix}-${index}`
        }))
      ];
    }
    const dataPart = {
      loại: chunk.type,
      dữ liệu: "dữ liệu" trong khối? khối.dữ liệu : void 0,
      ..."id" trong chunk && typeof chunk.id === "string" ? { id: chunk.id } : {}
    };
    const lastMessage = result[result.length - 1];
    nếu (!lastMessage || lastMessage.role !== "assistant") {
      return appendAssistantMessage(result, `data-${chunk.runId}-${Date.now()}`, [dataPart], metadata);
    }
    return replaceLast(result, withParts(lastMessage, [...lastMessage.content.parts, dataPart]));
  }
  switch (chunk.type) {
    trường hợp "dây bẫy": {
      const newMessage = newAssistantMessage(
        `tripwire-${chunk.runId + Date.now()}`,
        [{ type: "text", text: chunk.payload.reason }],
        {
          ...siêu dữ liệu,
          trạng thái: "cảnh báo nguy hiểm",
          dây bẫy: {
            lý do: chunk.payload.reason,
            thử lại: chunk.payload.retry,
            siêu dữ liệu: chunk.payload.metadata,
            processorId: chunk.payload.processorId
          }
        }
      );
      trả về [...kết quả, newMessage];
    }
    trường hợp "bắt đầu": {
      const messageId = typeof chunk.payload.messageId === "string" ? chunk.payload.messageId : void 0;
      if (messageId && result.some((message) => message.id === messageId)) return result;
      return [...result, newAssistantMessage(messageId ?? `start-${chunk.runId + Date.now()}`, [], metadata)];
    }
    trường hợp "text-start": {
      const lastMessage = result[result.length - 1];
      const textId = chunk.payload.id || `text-${Date.now()}`;
      if (chunk.payload.id && lastMessage?.role === "assistant" && lastMessage.content.parts.some((part) => part.type === "text" && partTextId(part) === textId)) {
        Trả về kết quả;
      }
      const newTextPart = {
        loại: "văn bản",
        chữ: "",
        trạng thái: "đang phát trực tuyến",
        textId,
        providerMetadata: chunk.payload.providerMetadata
      };
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        trả về appendAssistantMessage(
          kết quả,
          `start-${chunk.runId}-${Date.now()}`,
          [newTextPart],
          siêu dữ liệu
        );
      }
      nếu (lastMessage.content.metadata?.completionResult) {
        trả về appendAssistantMessage(
          kết quả,
          `start-${chunk.runId}-${Date.now()}`,
          [newTextPart],
          siêu dữ liệu
        );
      }
      trả về replaceLast(
        kết quả,
        withParts(lastMessage, [...lastMessage.content.parts, newTextPart])
      );
    }
    trường hợp "tiến trình tác vụ nền": {
      const lastMessage = result[result.length - 1];
      if (!lastMessage || lastMessage.role !== "assistant") return result;
      trả về replaceLast(
        kết quả,
        withMetadata(lastMessage, {
          chế độ: metadata.mode,
          ...lastMessage.content.metadata,
          runningBackgroundTasksCount: chunk.payload.runningCount
        })
      );
    }
    trường hợp "text-delta": {
      const lastMessage = result[result.length - 1];
      const textId = chunk.payload.id;
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        const newTextPart = {
          loại: "văn bản",
          văn bản: chunk.payload.text,
          trạng thái: "đang phát trực tuyến",
          textId,
          providerMetadata: chunk.payload.providerMetadata
        };
        trả về appendAssistantMessage(
          kết quả,
          `text-${chunk.runId}-${Date.now()}`,
          [newTextPart],
          siêu dữ liệu
        );
      }
      const parts = [...lastMessage.content.parts];
      hãy để textPartIndex = textId? parts.findLastIndex((part) => part.type === "text" && partTextId(part) === textId) : -1;
      nếu (textPartIndex === -1) {
        textPartIndex = parts.findLastIndex((part) => part.type === "text" && partState(part) === "streaming");
      }
      nếu (textPartIndex === -1) {
        const newTextPart = {
          loại: "văn bản",
          văn bản: chunk.payload.text,
          trạng thái: "đang phát trực tuyến",
          textId,
          providerMetadata: chunk.payload.providerMetadata
        };
        parts.push(newTextPart);
      } khác {
        const textPart = parts[textPartIndex];
        parts[textPartIndex] = {
          ...textPart,
          văn bản: textPart.text + chunk.payload.text,
          trạng thái: "đang phát trực tuyến"
        };
      }
      return replaceLast(result, withParts(lastMessage, parts));
    }
    trường hợp "text-end": {
      Trả về kết quả;
    }
    trường hợp "reasoning-start": {
      const lastMessage = result[result.length - 1];
      const newReasoningPart = {
        loại: "lý luận",
        lý luận: "",
        trạng thái: "đang phát trực tuyến",
        providerMetadata: chunk.payload.providerMetadata
      };
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        trả về appendAssistantMessage(
          kết quả,
          `reasoning-${chunk.runId + Date.now()}`,
          [newReasoningPart],
          siêu dữ liệu
        );
      }
      trả về replaceLast(
        kết quả,
        withParts(lastMessage, [...lastMessage.content.parts, newReasoningPart])
      );
    }
    trường hợp "reasoning-delta": {
      const lastMessage = result[result.length - 1];
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        const newReasoningPart = {
          loại: "lý luận",
          Lý do: chunk.payload.text,
          trạng thái: "đang phát trực tuyến",
          providerMetadata: chunk.payload.providerMetadata
        };
        trả về appendAssistantMessage(
          kết quả,
          `reasoning-${chunk.runId + Date.now()}`,
          [newReasoningPart],
          siêu dữ liệu
        );
      }
      const parts = [...lastMessage.content.parts];
      const lastIndex = parts.length - 1;
      const lastPart = parts[lastIndex];
      nếu (lastPart?.type === "reasoning") {
        const reasoningPart = lastPart;
        parts[lastIndex] = {
          ...phần lý luận,
          lý luận: reasoningPart.reasoning + chunk.payload.text,
          trạng thái: "đang phát trực tuyến"
        };
      } khác {
        const newReasoningPart = {
          loại: "lý luận",
          Lý do: chunk.payload.text,
          trạng thái: "đang phát trực tuyến",
          providerMetadata: chunk.payload.providerMetadata
        };
        parts.push(newReasoningPart);
      }
      return replaceLast(result, withParts(lastMessage, parts));
    }
    trường hợp "reasoning-end": {
      const lastMessage = result[result.length - 1];
      if (!lastMessage || lastMessage.role !== "assistant") return result;
      const parts = [...lastMessage.content.parts];
      const reasoningIndex = parts.findLastIndex((part) => part.type === "reasoning" && partState(part) === "streaming");
      if (reasoningIndex === -1) return result;
      const reasoningPart = parts[reasoningIndex];
      const existingMeta = reasoningPart.providerMetadata;
      const endMeta = chunk.payload.providerMetadata;
      các phần[chỉ số lý luận] = {
        ...phần lý luận,
        Trạng thái: "đã hoàn thành",
        ...existingMeta || endMeta ? { providerMetadata: { ...existingMeta ?? {}, ...endMeta ?? {} } } : {}
      };
      return replaceLast(result, withParts(lastMessage, parts));
    }
    trường hợp "chữ ký lý luận": {
      const lastMessage = result[result.length - 1];
      if (!lastMessage || lastMessage.role !== "assistant") return result;
      const parts = [...lastMessage.content.parts];
      const reasoningIndex = parts.findLastIndex((part) => part.type === "reasoning");
      if (reasoningIndex === -1) return result;
      const reasoningPart = parts[reasoningIndex];
      const existingMeta = reasoningPart.providerMetadata;
      const sigMeta = chunk.payload.providerMetadata;
      các phần[chỉ số lý luận] = {
        ...phần lý luận,
        ...existingMeta || sigMeta ? { providerMetadata: { ...existingMeta ?? {}, ...sigMeta ?? {} } } : {}
      };
      return replaceLast(result, withParts(lastMessage, parts));
    }
    trường hợp "lý do đã được lược bỏ": {
      const lastMessage = result[result.length - 1];
      const redactedData = chunk.payload.data;
      const redactedPart = {
        loại: "lý luận",
        Lý luận: typeof redactedData === "string" ? redactedData : "",
        Trạng thái: "đã hoàn thành",
        đã lược bỏ: đúng,
        providerMetadata: chunk.payload.providerMetadata
      };
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        trả về appendAssistantMessage(
          kết quả,
          `redacted-reasoning-${chunk.runId + Date.now()}`,
          [Phần bị che giấu],
          siêu dữ liệu
        );
      }
      trả về replaceLast(
        kết quả,
        withParts(lastMessage, [...lastMessage.content.parts, redactedPart])
      );
    }
    trường hợp "tool-call": {
      const invocation = {
        trạng thái: "cuộc gọi",
        toolCallId: chunk.payload.toolCallId,
        toolName: chunk.payload.toolName,
        đối số: chunk.payload.args
      };
      const newPart = {
        ...makeToolInvocationPart(invocation),
        providerMetadata: chunk.payload.providerMetadata
      };
      const existing = locateToolPart(result, chunk.payload.toolCallId, false);
      nếu (existing && existing.toolPartIndex >= 0) {
        const { messageIndex, toolPartIndex } = existing;
        const targetMessage = result[messageIndex];
        nếu (targetMessage && targetMessage.role === "assistant") {
          const parts = [...targetMessage.content.parts];
          const prev = parts[toolPartIndex];
          nếu (isToolPart(prev)) {
            const { argsText: _argsText, ...rest } = prev;
            parts[toolPartIndex] = {
              ...nghỉ ngơi,
              toolInvocation: {
                ...prev.toolInvocation,
                trạng thái: "cuộc gọi",
                toolName: chunk.payload.toolName,
                toolCallId: chunk.payload.toolCallId,
                đối số: chunk.payload.args
              },
              providerMetadata: chunk.payload.providerMetadata ?? prev.providerMetadata
            };
            return replaceAt(result, messageIndex, withParts(targetMessage, parts));
          }
        }
      }
      const lastMessage = result[result.length - 1];
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        return appendAssistantMessage(result, `tool-call-${chunk.runId + Date.now()}`, [newPart], metadata);
      }
      return replaceLast(result, withParts(lastMessage, [...lastMessage.content.parts, newPart]));
    }
    trường hợp "tool-call-input-streaming-start": {
      const lastMessage = result[result.length - 1];
      const invocation = {
        trạng thái: "cuộc gọi một phần",
        toolCallId: chunk.payload.toolCallId,
        toolName: chunk.payload.toolName,
        đối số: {}
      };
      const newPart = {
        ...makeToolInvocationPart(invocation),
        argsText: ""
      };
      nếu (!lastMessage || lastMessage.role !== "assistant") {
        trả về appendAssistantMessage(
          kết quả,
          `tool-call-streaming-${chunk.runId + Date.now()}`,
          [Phần mới],
          siêu dữ liệu
        );
      }
      return replaceLast(result, withParts(lastMessage, [...lastMessage.content.parts, newPart]));
    }
    trường hợp "tool-call-delta": {
      const location = locateToolPart(result, chunk.payload.toolCallId, false);
      if (!location || location.toolPartIndex < 0) return result;
      const { messageIndex, toolPartIndex } = location;
      const targetMessage = result[messageIndex];
      if (!targetMessage || targetMessage.role !== "assistant") return result;
      const parts = [...targetMessage.content.parts];
      const toolPart = parts[toolPartIndex];
      if (!isToolPart(toolPart)) return result;
      const nextArgsText = (toolPart.argsText ?? "") + (chunk.payload.argsTextDelta ?? "");
      parts[toolPartIndex] = {
        ...toolPart,
        argsText: nextArgsText,
        toolInvocation: {
          ...toolPart.toolInvocation,
          trạng thái: "cuộc gọi một phần"
        }
      };
      return replaceAt(result, messageIndex, withParts(targetMessage, parts));
    }
    trường hợp "tool-call-input-streaming-end": {
      const location = locateToolPart(result, chunk.payload.toolCallId, false);
      if (!location || location.toolPartIndex < 0) return result;
      const { messageIndex, toolPartIndex } = location;
      const targetMessage = result[messageIndex];
      if (!targetMessage || targetMessage.role !== "assistant") return result;
      const parts = [...targetMessage.content.parts];
      const toolPart = parts[toolPartIndex];
      if (!isToolPart(toolPart)) return result;
      let parsedArgs = {};
      const argsText = toolPart.argsText;
      if (typeof argsText === "string" && argsText.length > 0) {
        thử {
          const maybe = JSON.parse(argsText);
          if (maybe && typeof maybe === "object" && !Array.isArray(maybe)) {
            parsedArgs = có thể;
          }
        } nắm lấy {
          parsedArgs = {};
        }
      }
      parts[toolPartIndex] = {
        ...toolPart,
        toolInvocation: {
          ...toolPart.toolInvocation,
          trạng thái: "cuộc gọi",
          args: parsedArgs
        }
      };
      return replaceAt(result, messageIndex, withParts(targetMessage, parts));
    }
    trường hợp "lỗi công cụ":
    trường hợp "kết quả công cụ":
    trường hợp "background-task-completed":
    trường hợp "tác vụ nền thất bại": {
      const isBgTaskEvent = chunk.type === "background-task-completed" || chunk.type === "background-task-failed";
      const location = locateToolPart(result, chunk.payload.toolCallId, isBgTaskEvent);
      nếu (!location) trả về kết quả;
      const { messageIndex, toolPartIndex } = location;
      const targetMessage = result[messageIndex];
      if (!targetMessage || targetMessage.role !== "assistant") return result;
      const parts = [...targetMessage.content.parts];
      const toolPart = toolPartIndex >= 0 ? parts[toolPartIndex] : void 0;
      let payloadResult;
      let payloadError;
      let payloadIsError = false;
      let payloadProviderMetadata;
      let payloadCompletedAt;
      let payloadTaskId;
      switch (chunk.type) {
        trường hợp "kết quả công cụ":
          payloadResult = chunk.payload.result;
          payloadIsError = Boolean(chunk.payload.isError);
          payloadProviderMetadata = chunk.payload.providerMetadata;
          phá vỡ;
        trường hợp "lỗi công cụ":
          payloadError = chunk.payload.error;
          payloadProviderMetadata = chunk.payload.providerMetadata;
          phá vỡ;
        trường hợp "background-task-completed":
          payloadResult = chunk.payload.result;
          payloadCompletedAt = chunk.payload.completedAt;
          payloadTaskId = chunk.payload.taskId;
          phá vỡ;
        trường hợp "tác vụ nền thất bại":
          payloadError = chunk.payload.error;
          payloadCompletedAt = chunk.payload.completedAt;
          payloadTaskId = chunk.payload.taskId;
          phá vỡ;
      }
      nếu (toolPart && isToolPart(toolPart)) {
        const { toolName, toolCallId, args } = toolPart.toolInvocation;
        const providerMeta = payloadProviderMetadata ?? toolPart.providerMetadata;
        const isError = chunk.type === "tool-error" || chunk.type === "background-task-failed" || payloadIsError;
        nếu (isError) {
          const error = chunk.type === "tool-error" || chunk.type === "background-task-failed" ? payloadError : payloadResult;
          const errorText = typeof error === "string" ? error : error instanceof Error ? error.message : error?.message ?? String(error);
          parts[toolPartIndex] = {
            ...toolPart,
            providerMetadata: providerMeta,
            toolInvocation: {
              trạng thái: "lỗi đầu ra",
              toolCallId,
              Tên công cụ,
              đối số,
              văn bản lỗi
            }
          };
        } khác {
          const resultObj = payloadResult;
          const existingResult = toolPart.toolInvocation.state === "partial-call" || toolPart.toolInvocation.state === "result" ? toolPart.toolInvocation.result : void 0;
          const existingLooksLikeWorkflow = Boolean(
            existingResult && typeof existingResult === "object" && "steps" in existingResult
          );
          const isWorkflow = Boolean(resultObj?.result?.steps) || toolName?.startsWith("workflow-") || existingLooksLikeWorkflow;
          const isAgent = chunk.from === "AGENT";
          cho phép xuất ra;
          nếu (isWorkflow) {
            const accumulated = existingLooksLikeWorkflow && existingResult && typeof existingResult === "object" ? existingResult : void 0;
            const payloadWorkflow = resultObj?.result && typeof resultObj.result === "object" ? resultObj.result : void 0;
            nếu (đã tích lũy || payloadWorkflow) {
              đầu ra = {
                ...tích lũy ?? {},
                ...payloadWorkflow ?? {},
                // Giữ nguyên `steps` từ trạng thái tích lũy khi kết thúc
                // Tải trọng không chứa chúng.
                các bước: payloadWorkflow?.steps ?? accumulated?.steps ?? [],
                trạng thái: payloadWorkflow?.status ?? accumulated?.status ?? "thành công",
                // Hiển thị kết quả đầu ra dạng vô hướng của thiết bị đầu cuối mà không làm mất lịch sử.
                Kết quả đầu ra: payloadResult
              };
            } khác {
              output = payloadResult;
            }
          } nếu (isAgent) {
            const existingOutput = toolPart.toolInvocation.state === "result" ? toolPart.toolInvocation.result : void 0;
            const existingChild = existingOutput?.childMessages;
            đầu ra = đầu ra hiện có ? {
              ...payloadResult,
              childMessages: existingChild?.length ? existingChild : resultObj?.childMessages
            } : payloadResult;
          } khác {
            output = payloadResult;
          }
          parts[toolPartIndex] = {
            ...toolPart,
            providerMetadata: providerMeta,
            toolInvocation: {
              trạng thái: "kết quả",
              toolCallId,
              Tên công cụ,
              đối số,
              kết quả: đầu ra
            }
          };
        }
      }
      const nextMetadata = mergeBgTaskMetadata(
        targetMessage.content.metadata,
        metadata.mode,
        {
          resetRunningCount: isBgTaskEvent,
          perTaskEntry: isBgTaskEvent && payloadTaskId ? {
            toolCallId: chunk.payload.toolCallId,
            completedAt: payloadCompletedAt,
            taskId: payloadTaskId
          } : void 0
        }
      );
      const nextMessage = {
        ...thông điệp mục tiêu,
        nội dung: {
          ...targetMessage.content,
          các bộ phận,
          siêu dữ liệu: nextMetadata
        }
      };
      return replaceAt(result, messageIndex, nextMessage);
    }
    trường hợp "tác vụ nền đang chạy": {
      const location = locateToolPart(result, chunk.payload.toolCallId, true);
      nếu (!location) trả về kết quả;
      const { messageIndex } = location;
      const targetMessage = result[messageIndex];
      if (!targetMessage || targetMessage.role !== "assistant") return result;
      const nextMetadata = mergeBgTaskMetadata(
        targetMessage.content.metadata,
        metadata.mode,
        {
          perTaskEntry: {
            toolCallId: chunk.payload.toolCallId,
            startedAt: chunk.payload.startedAt,
            taskId: chunk.payload.taskId
          }
        }
      );
      return replaceAt(result, messageIndex, withMetadata(targetMessage, nextMetadata));
    }
    trường hợp "đầu ra công cụ":
    trường hợp "đầu ra tác vụ nền": {
      const isBgTaskOutput = chunk.type === "background-task-output";
      const location = locateToolPart(result, chunk.payload.toolCallId, isBgTaskOutput);
      if (!location || location.toolPartIndex < 0) return result;
      const { messageIndex, toolPartIndex } = location;
      const targetMessage = result[messageIndex];
      if (!targetMessage || targetMessage.role !== "assistant") return result;
      const parts = [...targetMessage.content.parts];
      const toolPart = parts[toolPartIndex];
      if (!isToolPart(toolPart)) return result;
      const { toolName, toolCallId, args } = toolPart.toolInvocation;
      const payloadOutput = chunk.type === "background-task-output" ? chunk.payload.payload.payload.output : chunk.payload.output;
      nếu (payloadOutput?.type?.startsWith("workflow-")) {
        const existingWorkflowState = toolPart.toolInvocation.result || {};
        const updated = mapWorkflowStreamChunkToWatchResult(existingWorkflowState, payloadOutput);
        parts[toolPartIndex] = {
          ...toolPart,
          toolInvocation: {
            trạng thái: "cuộc gọi một phần",
            toolCallId,
            Tên công cụ,
            đối số,
            Kết quả: đã cập nhật
          }
        };
      } else if (payloadOutput?.from === "AGENT" || payloadOutput?.from === "USER" && payloadOutput?.payload?.output?.type?.startsWith("workflow-")) {
        return accumulateAgentChunk(payloadOutput, result, metadata, toolCallId, toolName);
      } khác {
        const currentResult = toolPart.toolInvocation.result;
        const existing = Array.isArray(currentResult) ? currentResult : [];
        parts[toolPartIndex] = {
          ...toolPart,
          toolInvocation: {
            trạng thái: "cuộc gọi một phần",
            toolCallId,
            Tên công cụ,
            đối số,
            kết quả: [...hiện có, payloadOutput]
          }
        };
      }
      return replaceAt(result, messageIndex, withParts(targetMessage, parts));
    }
    trường hợp "is-task-complete": {
      if (chunk.payload.suppressFeedback) return result;
      const feedback = formatStreamCompletionFeedback(
        {
          hoàn tất: chunk.payload.passed,
          người chấm điểm: chunk.payload.results,
          totalDuration: chunk.payload.duration,
          timedOut: chunk.payload.timedOut},
        chunk.payload.maxIterationReached
      );
      const newMessage = newAssistantMessage(
        `is-task-complete-${chunk.runId + Date.now()}`,
        [{ type: "text", text: feedback }],
        {
          ...siêu dữ liệu,
          completionResult: { passed: chunk.payload.passed }
        }
      );
      trả về [...kết quả, newMessage];
    }
    trường hợp "nguồn": {
      const lastMessage = result[result.length - 1];
      if (!lastMessage || lastMessage.role !== "assistant") return result;
      const parts = [...lastMessage.content.parts];
      nếu (chunk.payload.sourceType === "url") {
        const sourceUrlPart = {
          loại: "source-url",
          sourceId: chunk.payload.id,
          url: chunk.payload.url || "",
          tiêu đề: chunk.payload.title,
          providerMetadata: chunk.payload.providerMetadata
        };
        parts.push(sourceUrlPart);
      } else if (chunk.payload.sourceType === "document") {
        parts.push({
          loại: "tài liệu nguồn",
          sourceId: chunk.payload.id,
          mediaType: chunk.payload.mimeType || "application/octet-stream",
          tiêu đề: chunk.payload.title,
          Tên tệp: chunk.payload.filename,
          providerMetadata: chunk.payload.providerMetadata
        });
      }
      return replaceLast(result, withParts(lastMessage, parts));
    }
    trường hợp "tệp": {
      const lastMessage = result[result.length - 1];
      if (!lastMessage || lastMessage.role !== "assistant") return result;
      const parts = [...lastMessage.content.parts];
      let url;
      nếu (typeof chunk.payload.data === "string") {
        url = chunk.payload.base64 ? `data:${chunk.payload.mimeType};base64,${chunk.payload.data}` : `data:${chunk.payload.mimeType},${encodeURIComponent(chunk.payload.data)}`;
      } khác {
        const base64 = btoa(String.fromCharCode(...chunk.payload.data));
        url = `data:${chunk.payload.mimeType};base64,${base64}`;
      }
      parts.push({
        loại: "tệp tin",
        mediaType: chunk.payload.mimeType,
        URL,
        providerMetadata: chunk.payload.providerMetadata
      });
      return replaceLast(result, withParts(lastMessage, parts));
    }
    trường hợp "phê duyệt cuộc gọi công cụ": {
      const lastMessage = result[result.length - 1];
      if (!lastMessage || lastMessage.role !== "assistant") return result;
      const existingMeta = lastMessage.content.metadata ?? {};
      const lastRequireApproval = existingMeta.mode === "stream" ? existingMeta.requireApprovalMetadata ?? {} : {};
      trả về replaceLast(result, {
        ...tin nhắn cuối cùng,
        nội dung: {
          ...lastMessage.content,
          siêu dữ liệu: {
            ...existingMeta,
            chế độ: "stream",
            yêu cầu siêu dữ liệu phê duyệt: {
              ...lastRequireApproval,
              [chunk.payload.toolName]: {
                toolCallId: chunk.payload.toolCallId,
                toolName: chunk.payload.toolName,
                đối số: chunk.payload.args
              }
            }
          }
        }
      });
    }
    trường hợp "tool-call-suspended":
    trường hợp "tác vụ nền bị tạm dừng": {
      const isBgTaskEvent = chunk.type === "background-task-suspended";
      let suspToolCallId;
      let suspToolName;
      let suspArgs;
      let suspPayload;
      cho phép bị đình chỉ tại;
      let suspTaskId;
      nếu (chunk.type === "background-task-suspended") {
        suspToolCallId = chunk.payload.toolCallId;
        suspToolName = chunk.payload.toolName;
        suspArgs = chunk.payload.args;
        suspPayload = chunk.payload.suspendPayload;
        suspSuspendedAt = chunk.payload.suspendedAt;
        suspTaskId = chunk.payload.taskId;
      } khác {
        suspToolCallId = chunk.payload.toolCallId;
        suspToolName = chunk.payload.toolName;
        suspArgs = chunk.payload.args;
        suspPayload = chunk.payload.suspendPayload;
      }
      const location = isBgTaskEvent ? locateToolPart(result, suspToolCallId, true) : { messageIndex: result.length - 1 };
      nếu (!location) trả về kết quả;
      const { messageIndex } = location;
      const targetMessage = result[messageIndex];
      if (!targetMessage || targetMessage.role !== "assistant") return result;
      const existingMeta = targetMessage.content.metadata ?? {};
      const lastSuspendedTools = existingMeta.mode === "stream" ? existingMeta.suspendedTools ?? {} : {};
      const nextMetadata = mergeBgTaskMetadata(
        existingMeta,
        "suối",
        {
          resetRunningCount: isBgTaskEvent,
          perTaskEntry: isBgTaskEvent && suspTaskId ? {
            toolCallId: suspToolCallId,
            bị đình chỉ tại: bị đình chỉ tại,
            taskId: suspTaskId
          } : void 0
        },
        {
          Công cụ bị đình chỉ: {
            ...lastSuspendedTools,
            [suspToolName]: {
              toolCallId: suspToolCallId,
              toolName: suspToolName,
              args: suspArgs,
              suspendPayload: suspPayload,
              runId: chunk.runId
            }
          }
        }
      );
      return replaceAt(result, messageIndex, withMetadata(targetMessage, nextMetadata));
    }
    trường hợp "hoàn thành":
    trường hợp "hủy bỏ": {
      return finishStreamingAssistantMessage(result);
    }
    trường hợp "lỗi": {
      const newMessage = newAssistantMessage(
        `error-${chunk.runId + Date.now()}`,
        [
          {
            loại: "văn bản",
            văn bản: typeof chunk.payload.error === "string" ? chunk.payload.error : JSON.stringify(chunk.payload.error)
          }
        ],
        {
          ...siêu dữ liệu,
          Trạng thái: "lỗi"
        }
      );
      trả về [...kết quả, newMessage];
    }
    // ----- Các khối vòng đời / bước / khung (không hiển thị trong thông báo cơ sở dữ liệu) -----
    trường hợp "khởi đầu từng bước":
    trường hợp "step-finish":
    trường hợp "đầu ra bước":
    trường hợp "thô":
    vỏ "đồng hồ":
    trường hợp "response-metadata":
      Trả về kết quả;
    // ----- Tín hiệu đánh giá mục tiêu (phản hồi đã được đưa vào)
    // Lịch sử tin nhắn theo bước mục tiêu cốt lõi; khối này chỉ dành cho người tiêu dùng.
    // tín hiệu này không được hiển thị dưới dạng thông báo cơ sở dữ liệu riêng biệt).
    trường hợp "mục tiêu":
      Trả về kết quả;
    // ----- Các khối đối tượng (đối tượng/kết quả đối tượng không được lưu trữ trong các thông báo cơ sở dữ liệu) -----
    trường hợp "đối tượng":
    trường hợp "đối tượng-kết quả":
      Trả về kết quả;
    // ----- Các dấu hiệu vòng đời tác vụ nền không được tích hợp vào thông báo -----
    trường hợp "background-task-started":
    trường hợp "background-task-cancelled":
    trường hợp "background-task-resumed":
      Trả về kết quả;
    // ----- Các bước chuyển tiếp vòng đời quy trình công việc (được xử lý bởi mapWorkflowStreamChunkToWatchResult bên trong tool-output) -----
    trường hợp "workflow-start":
    trường hợp "workflow-finish":
    trường hợp "workflow-canceled":
    trường hợp "workflow-paused":
    trường hợp "workflow-step-start":
    trường hợp "workflow-step-finish":
    trường hợp "workflow-step-suspended":
    trường hợp "workflow-step-waiting":
    trường hợp "đầu ra bước quy trình":
    trường hợp "tiến độ bước quy trình":
    trường hợp "workflow-step-result":
      Trả về kết quả;
    // ----- Thực thi lồng nhau / định tuyến / truyền tải qua mạng -----
    trường hợp "agent-execution-start":
    trường hợp "agent-execution-approval":
    trường hợp "agent-execution-suspended":
    trường hợp "agent-execution-end":
    trường hợp "agent-execution-abort":
    trường hợp "bắt đầu thực thi công cụ":
    trường hợp "tool-execution-end":
    trường hợp "phê duyệt thực thi công cụ":
    trường hợp "tool-execution-suspended":
    trường hợp "tool-execution-abort":
    trường hợp "routing-agent-start":
    trường hợp "routing-agent-text-delta":
    trường hợp "routing-agent-text-start":
    trường hợp "routing-agent-end":
    trường hợp "routing-agent-abort":
    trường hợp "workflow-execution-start":
    trường hợp "workflow-execution-end":
    trường hợp "workflow-execution-suspended":
    trường hợp "workflow-execution-abort":
    trường hợp "network-execution-event-step-finish":
    trường hợp "kết thúc sự kiện thực thi mạng":
    trường hợp "network-validation-start":
    trường hợp "kết thúc xác thực mạng":
    trường hợp "đối tượng mạng":
    trường hợp "kết quả đối tượng mạng":
      Trả về kết quả;
    mặc định:
      return assertExhaustive(chunk, result);
  }
};
var assertExhaustive = (_chunk, fallback) => fallback;
var accumulateAgentChunk = (chunk, conversation, _metadata, parentToolCallId, parentToolName) => {
  const lastMessage = conversation[conversation.length - 1];
  if (!lastMessage || lastMessage.role !== "assistant") return conversation;
  const parts = [...lastMessage.content.parts];
  const findToolPartIndex = () => parts.findIndex(
    (part) => isToolPart(part) && (parentToolCallId && part.toolInvocation.toolCallId === parentToolCallId || parentToolName && part.toolInvocation.toolName === parentToolName)
  );
  nếu (chunk.type === "text-delta") {
    const agentChunk = chunk.payload;
    const toolPartIndex = findToolPartIndex();
    if (toolPartIndex === -1) return conversation;
    const toolPart = parts[toolPartIndex];
    const existingResult = toolPart.toolInvocation.result || {};
    const childMessages = existingResult.childMessages || [];
    const lastChildMessage = childMessages[childMessages.length - 1];
    const textMessage = { type: "text", content: (lastChildMessage?.content || "") + agentChunk.text };
    const nextChildren = LastChildMessage?.type === "văn bản" ? [...childMessages.slice(0, -1), textMessage] : [...childMessages, textMessage];
    parts[toolPartIndex] = {
      ...toolPart,
      toolInvocation: {
        ...toolPart.toolInvocation,
        kết quả: { ...existingResult, childMessages: nextChildren }
      }
    };
  } else if (chunk.type === "tool-call") {
    const agentChunk = chunk.payload;
    const toolPartIndex = findToolPartIndex();
    if (toolPartIndex === -1) return conversation;
    const toolPart = parts[toolPartIndex];
    const existingResult = toolPart.toolInvocation.result || {};
    const childMessages = existingResult.childMessages || [];
    parts[toolPartIndex] = {
      ...toolPart,
      toolInvocation: {
        ...toolPart.toolInvocation,
        kết quả: {
          ...Kết quả hiện có,
          childMessages: [
            ...tin nhắn trẻ em,
            {
              loại: "công cụ",
              toolCallId: agentChunk.toolCallId,
              toolName: agentChunk.toolName,
              args: agentChunk.args
            }
          ]
        }
      }
    };
  } else if (chunk.type === "tool-output") {
    const agentChunk = chunk.payload;
    const toolPartIndex = findToolPartIndex();
    if (toolPartIndex === -1) return conversation;
    const toolPart = parts[toolPartIndex];
    if (agentChunk?.output?.type?.startsWith("workflow-")) {
      const existingResult = toolPart.toolInvocation.result || {};
      const childMessages = existingResult.childMessages || [];
      const lastIndex = childMessages.length - 1;
      const currentMessage = childMessages[lastIndex];
      const actualExistingWorkflowState = currentMessage?.toolOutput || {};
      const updated = mapWorkflowStreamChunkToWatchResult(actualExistingWorkflowState, agentChunk.output);
      if (lastIndex >= 0 && childMessages[lastIndex]?.type === "tool") {
        parts[toolPartIndex] = {
          ...toolPart,
          toolInvocation: {
            ...toolPart.toolInvocation,
            kết quả: {
              ...Kết quả hiện có,
              childMessages: [
                ...childMessages.slice(0, -1),
                {
                  ...tin nhắn hiện tại,
                  toolOutput: { ...đã cập nhật, runId: agentChunk.output.runId }
                }
              ]
            }
          }
        };
      }
    }
  } else if (chunk.type === "tool-result") {
    const agentChunk = chunk.payload;
    const toolPartIndex = findToolPartIndex();
    if (toolPartIndex === -1) return conversation;
    const toolPart = parts[toolPartIndex];
    const existingResult = toolPart.toolInvocation.result || {};
    const childMessages = existingResult.childMessages || [];
    const lastIndex = childMessages.length - 1;
    const isWorkflow = agentChunk?.toolName?.startsWith("workflow-");
    if (lastIndex >= 0 && childMessages[lastIndex]?.type === "tool") {
      parts[toolPartIndex] = {
        ...toolPart,
        toolInvocation: {
          ...toolPart.toolInvocation,
          kết quả: {
            ...Kết quả hiện có,
            childMessages: [
              ...childMessages.slice(0, -1),
              {
                ...childMessages[lastIndex],
                toolOutput: isWorkflow ? { ...agentChunk.result?.result, runId: agentChunk.result?.runId } : agentChunk.result
              }
            ]
          }
        }
      };
    }
  }
  return replaceLast(conversation, withParts(lastMessage, parts));
};
var networkMode = (siêu dữ liệu) => ({ ...siêu dữ liệu, mode: "mạng" });
var findPartIndex = (parts, predicate) => parts.findIndex(predicate);
var isDynamicToolPart = (part) => part.type === "dynamic-tool";
var LastAssistant = (cuộc trò chuyện) => {
  const last = conversation[conversation.length - 1];
  return last && last.role === "assistant" ? last : void 0;
};
var tryParseRoutingDecision = (được đệm) => {
  const trimmed = buffered.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  thử {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object") {
      Trả về kết quả đã phân tích cú pháp;
    }
    trả về null;
  } nắm lấy {
    trả về null;
  }
};
var handRoutingAgentDelta = (đoạn, hội thoại, siêu dữ liệu) => {
  const delta = chunk.payload?.text ?? "";
  nếu (!delta) trả về cuộc hội thoại;
  const lastMessage = lastAssistant(conversation);
  const mergeRoutingMetadata = (existing) => {
    const buffered = (existing.routingDecisionBuffer ?? "") + delta;
    const next = { ...cloneMetadata(existing), mode: "network" };
    const parsed = tryParseRoutingDecision(buffered);
    nếu (đã phân tích cú pháp) {
      next.routingDecision = parsed;
      xóa next.routingDecisionBuffer;
      xóa next.routingDecisionText;
    } khác {
      next.routingDecisionBuffer = buffered;
      next.routingDecisionText = buffered;
    }
    trở lại tiếp theo;
  };
  nếu (!lastMessage) {
    const seed = mergeRoutingMetadata({});
    trả về appendAssistantMessage(
      cuộc hội thoại,
      `routing-agent-${chunk.payload?.runId ?? "unknown"}-${Date.now()}`,
      [],
      { ...networkMode(metadata), ...seed }
    );
  }
  return replaceLast(conversation, withMetadata(lastMessage, mergeRoutingMetadata(lastMessage.content.metadata ?? {})));
};
var handleAgentNetworkChunk = (chunk, conversation, metadata) => {
  nếu (chunk.type === "agent-execution-start") {
    const primitiveId = chunk.payload?.args?.primitiveId;
    const runId = chunk.payload.runId;
    if (!primitiveId || !runId) return conversation;
    const toolPart = {
      loại: "công cụ động",
      toolName: primitiveId,
      toolCallId: runId,
      trạng thái: "đầu vào khả dụng",
      đầu vào: chunk.payload.args
    };
    return appendAssistantMessage(conversation, `agent-execution-start-${runId}-${Date.now()}`, [toolPart], {
      ...networkMode(metadata),
      selectionReason: chunk.payload?.args?.selectionReason || "",
      agentInput: chunk.payload?.args?.task,
      Từ: "ĐẠI LÝ"
    });
  }
  nếu (chunk.type === "agent-execution-end") {
    const lastMessage = lastAssistant(conversation);
    nếu (!lastMessage) trả về cuộc hội thoại;
    const parts = [...lastMessage.content.parts];
    const toolPartIndex = findPartIndex(parts, (part) => isDynamicToolPart(part));
    nếu (toolPartIndex !== -1) {
      const toolPart = parts[toolPartIndex];
      const currentOutput = toolPart.output;
      parts[toolPartIndex] = {
        loại: "công cụ động",
        toolName: toolPart.toolName,
        toolCallId: toolPart.toolCallId,
        trạng thái: "đầu ra có sẵn",
        Đầu vào: toolPart.input,
        đầu ra: { ...currentOutput, kết quả: currentOutput?.result || chunk.payload?.result || "" }
      };
    }
    return replaceLast(conversation, withParts(lastMessage, parts));
  }
  if (chunk.type.startsWith("agent-execution-event-")) {
    const lastMessage = lastAssistant(conversation);
    nếu (!lastMessage) trả về cuộc hội thoại;
    const agentChunk = chunk.payload;
    const parts = [...lastMessage.content.parts];
    const toolPartIndex = findPartIndex(parts, (part) => isDynamicToolPart(part));
    if (toolPartIndex === -1) return conversation;
    const toolPart = parts[toolPartIndex];
    nếu (agentChunk.type === "text-delta") {
      const childMessages = toolPart?.output?.childMessages || [];
      const lastChildMessage = childMessages[childMessages.length - 1];
      const textMessage = { type: "text", content: (lastChildMessage?.content || "") + agentChunk.payload.text };
      const nextMessages = LastChildMessage?.type === "văn bản" ? [...childMessages.slice(0, -1), textMessage] : [...childMessages, textMessage];
      parts[toolPartIndex] = {
        ...toolPart,
        đầu ra: { childMessages: nextMessages }
      };
    } else if (agentChunk.type === "tool-call") {
      const childMessages = toolPart?.output?.childMessages || [];
      parts[toolPartIndex] = {
        ...toolPart,
        đầu ra: {
          ...toolPart?.output,
          childMessages: [
            ...tin nhắn trẻ em,
            {
              loại: "công cụ",
              toolCallId: agentChunk.payload.toolCallId,
              toolName: agentChunk.payload.toolName,
              đối số: agentChunk.payload.args
            }
          ]
        }
      };
    } else if (agentChunk.type === "tool-output") {
      if (agentChunk.payload?.output?.type?.startsWith("workflow-")) {
        const childMessages = toolPart?.output?.childMessages || [];
        const lastToolIndex = childMessages.length - 1;
        const currentMessage = childMessages[lastToolIndex];
        const actualExistingWorkflowState = currentMessage?.toolOutput || {};
        const updatedWorkflowState = mapWorkflowStreamChunkToWatchResult(
          actualExistingWorkflowState,
          agentChunk.payload.output
        );
        if (lastToolIndex >= 0 && childMessages[lastToolIndex]?.type === "tool") {
          parts[toolPartIndex] = {
            ...toolPart,
            output: {
              ...toolPart?.output,
              childMessages: [...childMessages.slice(0, -1), { ...currentMessage, toolOutput: updatedWorkflowState }]
            }
          };
        }
      }
    } else if (agentChunk.type === "tool-result") {
      const childMessages = toolPart?.output?.childMessages || [];
      const lastToolIndex = childMessages.length - 1;
      const isWorkflow = Boolean(agentChunk.payload?.result?.result?.steps);
      if (lastToolIndex >= 0 && childMessages[lastToolIndex]?.type === "tool") {
        parts[toolPartIndex] = {
          ...toolPart,
          output: {
            ...toolPart?.output,
            childMessages: [
              ...childMessages.slice(0, -1),
              {
                ...childMessages[lastToolIndex],
                toolOutput: isWorkflow ? agentChunk.payload.result.result : agentChunk.payload.result
              }
            ]
          }
        };
      }
    }
    return replaceLast(conversation, withParts(lastMessage, parts));
  }
  return conversation;
};
var handleWorkflowNetworkChunk = (chunk, conversation, metadata) => {
  if (chunk.type === "workflow-execution-start") {
    const primitiveId = chunk.payload?.args?.primitiveId;
    const runId = chunk.payload.runId;
    if (!primitiveId || !runId) return conversation;
    let agentInput;
    try {
      agentInput = JSON.parse(chunk.payload?.args?.prompt);
    } catch {
      agentInput = chunk.payload?.args?.prompt;
    }
    const toolPart = {
      type: "dynamic-tool",
      toolName: primitiveId,
      toolCallId: runId,
      state: "input-available",
      input: chunk.payload.args
    };
    return appendAssistantMessage(conversation, `workflow-start-${runId}-${Date.now()}`, [toolPart], {
      ...networkMode(metadata),
      selectionReason: chunk.payload?.args?.selectionReason || "",
      from: "WORKFLOW",
      agentInput
    });
  }
  if (chunk.type === "workflow-execution-suspended") {
    const lastMessage = lastAssistant(conversation);
    if (!lastMessage) return conversation;
    const existing = lastMessage.content.metadata?.suspendedTools ?? {};
    return replaceLast(
      conversation,
      withMetadata(lastMessage, {
        ...cloneMetadata(lastMessage.content.metadata),
        mode: "network",
        suspendedTools: {
          ...existing,
          [chunk.payload.toolName]: {
            toolCallId: chunk.payload.toolCallId,
            toolName: chunk.payload.toolName,
            args: chunk.payload.args,
            suspendPayload: chunk.payload.suspendPayload,
            runId: chunk.payload.runId
          }
        }
      })
    );
  }
  if (chunk.type.startsWith("workflow-execution-event-")) {
    const lastMessage = lastAssistant(conversation);
    if (!lastMessage) return conversation;
    const parts = [...lastMessage.content.parts];
    const toolPartIndex = findPartIndex(parts, (part) => isDynamicToolPart(part));
    if (toolPartIndex === -1) return conversation;
    const toolPart = parts[toolPartIndex];
    const existingWorkflowState = toolPart.output || {};
    const updatedWorkflowState = mapWorkflowStreamChunkToWatchResult(existingWorkflowState, chunk.payload);
    parts[toolPartIndex] = { ...toolPart, output: updatedWorkflowState };
    return replaceLast(conversation, withParts(lastMessage, parts));
  }
  return conversation;
};
var handleToolNetworkChunk = (chunk, conversation, metadata) => {
  if (chunk.type === "tool-execution-start") {
    const argsData = chunk.payload.args;
    const nestedArgs = argsData.args || {};
    const lastMessage = lastAssistant(conversation);
    const toolPart = {
      type: "dynamic-tool",
      toolName: argsData.toolName || "unknown",
      toolCallId: argsData.toolCallId || "unknown",
      state: "input-available",
      input: nestedArgs
    };
    if (!lastMessage) {
      return appendAssistantMessage(
        conversation,
        `tool-start-${chunk.payload.runId}-${Date.now()}`,
        [toolPart],
        {
          ...networkMode(metadata),
          selectionReason: metadata.mode === "network" ? metadata.selectionReason || argsData.selectionReason : "",
          agentInput: nestedArgs
        }
      );
    }
    const parts = [...lastMessage.content.parts, toolPart];
    return replaceLast(conversation, withParts(lastMessage, parts));
  }
  if (chunk.type === "tool-execution-approval") {
    const lastMessage = lastAssistant(conversation);
    if (!lastMessage) return conversation;
    const existing = lastMessage.content.metadata?.requireApprovalMetadata ?? {};
    return replaceLast(
      conversation,
      withMetadata(lastMessage, {
        ...cloneMetadata(lastMessage.content.metadata),
        mode: "network",
        requireApprovalMetadata: {
          ...existing,
          [chunk.payload.toolName]: {
            toolCallId: chunk.payload.toolCallId,
            toolName: chunk.payload.toolName,
            args: chunk.payload.args,
            runId: chunk.payload.runId
          }
        }
      })
    );
  }
  if (chunk.type === "tool-execution-suspended") {
    const lastMessage = lastAssistant(conversation);
    if (!lastMessage) return conversation;
    const existing = lastMessage.content.metadata?.suspendedTools ?? {};
    return replaceLast(
      conversation,
      withMetadata(lastMessage, {
        ...cloneMetadata(lastMessage.content.metadata),
        mode: "network",
        suspendedTools: {
          ...existing,
          [chunk.payload.toolName]: {
            toolCallId: chunk.payload.toolCallId,
            toolName: chunk.payload.toolName,
            args: chunk.payload.args,
            suspendPayload: chunk.payload.suspendPayload,
            runId: chunk.payload.runId
          }
        }
      })
    );
  }
  if (chunk.type === "tool-execution-end") {
    const lastMessage = lastAssistant(conversation);
    if (!lastMessage) return conversation;
    const parts = [...lastMessage.content.parts];
    const toolPartIndex = findPartIndex(
      parts,
      (part) => isDynamicToolPart(part) && part.toolCallId === chunk.payload.toolCallId
    );
    if (toolPartIndex !== -1) {
      const toolPart = parts[toolPartIndex];
      const currentOutput = toolPart.output;
      parts[toolPartIndex] = {
        type: "dynamic-tool",
        toolName: toolPart.toolName,
        toolCallId: toolPart.toolCallId,
        state: "output-available",
        input: toolPart.input,
        output: currentOutput?.result || chunk.payload?.result || ""
      };
    }
    return replaceLast(conversation, withParts(lastMessage, parts));
  }
  return conversation;
};
var accumulateNetworkChunk = ({
  chunk,
  conversation,
  metadata
}) => {
  const newConversation = [...conversation];
  if (chunk.type === "routing-agent-text-delta") {
    return handleRoutingAgentDelta(chunk, newConversation, metadata);
  }
  if (chunk.type.startsWith("agent-execution-")) {
    return handleAgentNetworkChunk(chunk, newConversation, metadata);
  }
  if (chunk.type.startsWith("workflow-execution-")) {
    return handleWorkflowNetworkChunk(chunk, newConversation, metadata);
  }
  if (chunk.type.startsWith("tool-execution-")) {
    return handleToolNetworkChunk(chunk, newConversation, metadata);
  }
  if (chunk.type === "network-validation-end") {
    if (chunk.payload.suppressFeedback) return newConversation;
    const feedback = formatCompletionFeedback(
      {
        complete: chunk.payload.passed,
        scorers: chunk.payload.results,
        totalDuration: chunk.payload.duration,
        timedOut: chunk.payload.timedOut},
      chunk.payload.maxIterationReached
    );
    const textPart = { type: "text", text: feedback };
    return appendAssistantMessage(
      newConversation,
      `network-validation-end-${chunk.payload.runId}-${Date.now()}`,
      [textPart],
      {
        ...networkMode(metadata),
        completionResult: { passed: chunk.payload.passed }
      }
    );
  }
  if (chunk.type === "network-execution-event-step-finish") {
    const lastMessage = lastAssistant(newConversation);
    if (!lastMessage) return newConversation;
    const agentChunk = chunk.payload;
    const parts = [...lastMessage.content.parts];
    const textPartIndex = findPartIndex(parts, (part) => part.type === "text");
    if (textPartIndex === -1) {
      parts.push({ type: "text", text: agentChunk.result, state: "done" });
      return replaceLast(newConversation, withParts(lastMessage, parts));
    }
    const textPart = parts[textPartIndex];
    if (textPart.type === "text") {
      parts[textPartIndex] = {
        ...textPart,
        state: "done"
      };
      return replaceLast(newConversation, withParts(lastMessage, parts));
    }
    return newConversation;
  }
  return newConversation;
};

// src/lib/mastra-db/fromCoreUserMessage.ts
var coreUserMessageToParts = (coreUserMessage) => typeof coreUserMessage.content === "string" ? [{ type: "text", text: coreUserMessage.content }] : coreUserMessage.content.map((part) => {
  switch (part.type) {
    case "text": {
      return { type: "text", text: part.text };
    }
    case "image": {
      const data = typeof part.image === "string" ? part.image : part.image instanceof URL ? part.image.toString() : "";
      return {
        type: "file",
        mimeType: part.mimeType ?? "image/*",
        data
      };
    }
    case "file": {
      const data = typeof part.data === "string" ? part.data : part.data instanceof URL ? part.data.toString() : "";
      return {
        type: "file",
        mimeType: part.mimeType,
        data,
        ...part.filename !== void 0 ? { filename: part.filename } : {}
      };
    }
    default: {
      const exhaustiveCheck = part;
      throw new Error(`Unhandled content part type: ${exhaustiveCheck.type}`);
    }
  }
});
var newUserMessage = (parts) => ({
  id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  role: "user",
  createdAt: /* @__PURE__ */ new Date(),
  content: {
    format: 2,
    parts
  }
});
var fromCoreUserMessageToMastraDBMessage = (coreUserMessage) => newUserMessage(coreUserMessageToParts(coreUserMessage));
var fromCoreUserMessagesToMastraDBMessage = (coreUserMessages) => newUserMessage(coreUserMessages.flatMap(coreUserMessageToParts));

// src/agent/extractRunIdFromMessages.ts
var isRecord = (value) => value !== null && typeof value === "object";
var runIdMetadataKeys = ["pendingToolApprovals", "requireApprovalMetadata", "suspendedTools"];
var isRunIdMetadataSource = (value) => isRecord(value) && Object.values(value).every((entry) => isRecord(entry));
var getRunIdMetadataSources = (metadata) => {
  if (!isRecord(metadata)) return [];
  const sources = [];
  for (const key of runIdMetadataKeys) {
    const source = metadata[key];
    if (isRunIdMetadataSource(source)) {
      sources.push(source);
    }
  }
  return sources;
};
var extractRunIdFromMessages = (messages) => {
  for (const message of messages) {
    for (const source of getRunIdMetadataSources(message.content?.metadata)) {
      for (const entry of Object.values(source)) {
        if (isRecord(entry) && typeof entry.runId === "string" && entry.runId.length > 0) {
          return entry.runId;
        }
      }
    }
  }
  return void 0;
};

// src/agent/signal-data.ts
function convertSignalDataToBase64String(content) {
  if (typeof content === "string") {
    return content;
  }
  const bytes = content instanceof ArrayBuffer ? new Uint8Array(content) : content;
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

// src/agent/hooks.ts
var extractPendingToolApprovalIdsFromMessages = (messages) => {
  const pendingToolApprovalIds = /* @__PURE__ */ new Set();
  for (const message of messages) {
    const metadata = message.content?.metadata;
    if (!metadata) continue;
    const metadataSources = [
      metadata.pendingToolApprovals,
      metadata.requireApprovalMetadata,
      metadata.suspendedTools
    ];
    for (const source of metadataSources) {
      if (!source || typeof source !== "object") continue;
      for (const suspensionData of Object.values(source)) {
        const toolCallId = suspensionData?.toolCallId;
        if (typeof toolCallId === "string" && toolCallId.length > 0) {
          pendingToolApprovalIds.add(toolCallId);
        }
      }
    }
  }
  return pendingToolApprovalIds;
};
var toolCallHasOutput = (parts, toolCallId) => parts.some((part) => {
  if (part.type !== "tool-invocation") return false;
  const invocation = part.toolInvocation;
  if (invocation.toolCallId !== toolCallId) return false;
  return invocation.state === "result" || invocation.result != null;
});
var resolveInitialMessages = (messages) => messages.filter((message) => {
  const metadata = message.content?.metadata;
  if (metadata?.completionResult?.suppressFeedback || metadata?.isTaskCompleteResult?.suppressFeedback) {
    return false;
  }
  return true;
}).map((message) => {
  const metadata = message.content?.metadata;
  const normalizedMessage = metadata && (metadata.status === "pending" || CLIENT_MESSAGE_ID_KEY in metadata) ? (() => {
    const { [CLIENT_MESSAGE_ID_KEY]: _omitClientMessageId, ...rest } = metadata;
    const { status: _omitStatus, ...restWithoutStatus } = rest;
    return {
      ...message,
      content: {
        ...message.content,
        metadata: metadata.status === "pending" ? restWithoutStatus : rest
      }
    };
  })() : message;
  const normalizedMetadata = normalizedMessage.content?.metadata;
  const pendingToolApprovals = normalizedMetadata?.pendingToolApprovals;
  if (!pendingToolApprovals || typeof pendingToolApprovals !== "object") {
    return normalizedMessage;
  }
  const stillPending = Object.fromEntries(
    Object.entries(pendingToolApprovals).filter(
      ([, approval]) => approval && typeof approval === "object" && typeof approval.toolCallId === "string" && !toolCallHasOutput(normalizedMessage.content.parts, approval.toolCallId)
    )
  );
  const { pendingToolApprovals: _omit, ...restMetadata } = normalizedMetadata;
  const hasStillPending = Object.keys(stillPending).length > 0;
  return {
    ...normalizedMessage,
    content: {
      ...normalizedMessage.content,
      metadata: {
        ...restMetadata,
        mode: "stream",
        ...hasStillPending ? { pendingToolApprovals: stillPending, requireApprovalMetadata: stillPending } : {}
      }
    }
  };
});
var isObject = (value) => typeof value === "object" && value !== null;
var getErrorName = (error) => isObject(error) && typeof error.name === "string" ? error.name : void 0;
var isAbortError = (error) => getErrorName(error) === "AbortError";
var isThreadSignalUnsupportedError = (error) => {
  if (!isObject(error)) return false;
  const status = error.status;
  if (status === 404 || status === 405 || status === 501) {
    return true;
  }
  return status === 400 && typeof error.message === "string" && error.message.includes("No active agent run found for signal target");
};
var isDataChunk2 = (chunk) => typeof chunk.type === "string" && chunk.type.startsWith("data-");
var dbFromServerUiMessages = (uiMessages, metadata) => uiMessages.map((uiMsg) => {
  const dbMsg = AIV5Adapter.fromUIMessage(uiMsg);
  return {
    ...dbMsg,
    content: {
      ...dbMsg.content,
      metadata: {
        ...dbMsg.content.metadata ?? {},
        ...metadata
      }
    }
  };
});
var useChat = ({
  agentId,
  resourceId,
  threadId,
  initialMessages,
  requestContext: propsRequestContext,
  clientTools: hookClientTools,
  onSignalSent,
  onSignalEcho,
  onThreadSignalsUnsupported,
  enableThreadSignals = false
}) => {
  const threadSignalsDisabled = enableThreadSignals === false;
  const _currentRunId = useRef(void 0);
  const _onChunk = useRef(void 0);
  const _networkRunId = useRef(void 0);
  const _onNetworkChunk = useRef(void 0);
  const _requestContext = useRef(propsRequestContext);
  const _streamAbortRef = useRef(null);
  const _threadSubscriptionAbortRef = useRef(null);
  const _threadSubscriptionRef = useRef(
    null
  );
  const _threadSubscriptionKeyRef = useRef(void 0);
  const _threadSubscriptionPromiseRef = useRef(null);
  const _threadSignalsUnsupportedRef = useRef(false);
  const [messages, setMessages] = useState([]);
  const [toolCallApprovals, setToolCallApprovals] = useState({});
  const [networkToolCallApprovals, setNetworkToolCallApprovals] = useState({});
  const pendingToolApprovalIdsRef = useRef(/* @__PURE__ */ new Set());
  const [isAwaitingToolApproval, setIsAwaitingToolApproval] = useState(false);
  const baseClient = useMastraClient();
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    const formattedMessages = resolveInitialMessages(initialMessages ?? []);
    setMessages(formattedMessages);
    pendingToolApprovalIdsRef.current = extractPendingToolApprovalIdsFromMessages(formattedMessages);
    setIsAwaitingToolApproval(pendingToolApprovalIdsRef.current.size > 0);
    _currentRunId.current = extractRunIdFromMessages(formattedMessages);
  }, [initialMessages]);
  useEffect(() => {
    _requestContext.current = propsRequestContext;
  }, [propsRequestContext]);
  const normalizeSignalFileData = (data) => {
    if (data instanceof URL) return data.toString();
    return convertSignalDataToBase64String(data);
  };
  const getSignalContents = (coreUserMessages) => {
    const parts = coreUserMessages.reduce((allParts, message) => {
      if (typeof message.content === "string") {
        allParts.push({ type: "text", text: message.content });
        return allParts;
      }
      for (const part of message.content) {
        if (part.type === "text") {
          allParts.push({ type: "text", text: part.text });
        } else if (part.type === "file") {
          allParts.push({
            type: "file",
            data: normalizeSignalFileData(part.data),
            mediaType: part.mimeType,
            ...part.filename ? { filename: part.filename } : {}
          });
        } else if (part.type === "image") {
          allParts.push({
            type: "file",
            data: normalizeSignalFileData(part.image),
            mediaType: part.mimeType ?? "image/png"
          });
        }
      }
      return allParts;
    }, []);
    return parts.length === 1 && parts[0]?.type === "text" ? parts[0].text : parts;
  };
  const markThreadSignalsUnsupported = useCallback(() => {
    _threadSignalsUnsupportedRef.current = true;
    onThreadSignalsUnsupported?.();
  }, [onThreadSignalsUnsupported]);
  const getSignalPreview = (coreUserMessages) => {
    const preview = coreUserMessages.flatMap((message) => {
      if (typeof message.content === "string") {
        return [message.content];
      }
      return message.content.map((part) => {
        if (part.type === "text") return part.text;
        if (part.type === "image") return "Image";
        return part.filename ? `File: ${part.filename}` : "File";
      });
    }).join(" ").replace(/\s+/g, " ").trim();
    return preview || "Attachment";
  };
  const closeThreadSubscription = useCallback(() => {
    const subscription = _threadSubscriptionRef.current;
    if (subscription?.unsubscribe) {
      subscription.unsubscribe();
    } else {
      _threadSubscriptionAbortRef.current?.abort();
    }
    _threadSubscriptionRef.current = null;
    _threadSubscriptionAbortRef.current = null;
    _threadSubscriptionKeyRef.current = void 0;
    _threadSubscriptionPromiseRef.current = null;
  }, []);
  const processStreamChunk = useCallback(
    async (chunk, onChunk) => {
      setMessages((prev) => accumulateChunk({ chunk, conversation: prev, metadata: { mode: "stream" } }));
      if (chunk.type === "data-user-message" && isDataChunk2(chunk) && (chunk.data?.type === "user-message" || chunk.data?.type === "user") && typeof chunk.data?.id === "string") {
        onSignalEcho?.(chunk.data.id);
      }
      if (chunk.type === "start") {
        setIsRunning(true);
        if ("runId" in chunk && typeof chunk.runId === "string") {
          _currentRunId.current = chunk.runId;
        }
      }
      if (chunk.type === "tool-call-approval" || chunk.type === "tool-call-suspended") {
        const toolCallId = chunk.payload?.toolCallId;
        if (typeof toolCallId === "string") {
          pendingToolApprovalIdsRef.current.add(toolCallId);
          setIsAwaitingToolApproval(true);
        }
        setIsRunning(false);
      }
      if (chunk.type === "finish" || chunk.type === "abort" || chunk.type === "error") {
        pendingToolApprovalIdsRef.current.clear();
        setIsAwaitingToolApproval(false);
        setIsRunning(false);
      }
      void (onChunk ?? _onChunk.current)?.(chunk);
    },
    [onSignalEcho]
  );
  const ensureThreadSubscription = useCallback(
    async ({ threadId: threadId2, resourceId: resourceId2 }) => {
      const subscriptionKey = `${agentId}:${resourceId2 ?? ""}:${threadId2}`;
      if (_threadSubscriptionKeyRef.current === subscriptionKey && _threadSubscriptionPromiseRef.current) {
        await _threadSubscriptionPromiseRef.current;
        return;
      }
      closeThreadSubscription();
      const subscriptionAbort = new AbortController();
      _threadSubscriptionAbortRef.current = subscriptionAbort;
      _threadSubscriptionKeyRef.current = subscriptionKey;
      const clientWithAbort = new MastraClient({
        ...baseClient.options,
        abortSignal: subscriptionAbort.signal
      });
      const subscriptionAgent = clientWithAbort.getAgent(agentId);
      _threadSubscriptionPromiseRef.current = subscriptionAgent.subscribeToThread({ resourceId: resourceId2, threadId: threadId2 }).then((response) => {
        const subscription = response;
        if (_threadSubscriptionAbortRef.current !== subscriptionAbort) {
          subscription.unsubscribe();
          return;
        }
        _threadSubscriptionRef.current = subscription;
        void subscription.processDataStream({
          onChunk: (chunk) => processStreamChunk(chunk)
        }).catch((error) => {
          if (!isAbortError(error)) {
            console.error("[useChat] Thread subscription failed", error);
            setIsRunning(false);
          }
        }).finally(() => {
          if (_threadSubscriptionRef.current === subscription) {
            _threadSubscriptionRef.current = null;
          }
          if (_threadSubscriptionAbortRef.current === subscriptionAbort) {
            _threadSubscriptionAbortRef.current = null;
            _threadSubscriptionKeyRef.current = void 0;
            _threadSubscriptionPromiseRef.current = null;
          }
        });
      }).catch((error) => {
        if (isThreadSignalUnsupportedError(error)) {
          markThreadSignalsUnsupported();
          if (_threadSubscriptionAbortRef.current === subscriptionAbort) {
            _threadSubscriptionRef.current = null;
            _threadSubscriptionAbortRef.current = null;
            _threadSubscriptionKeyRef.current = void 0;
            _threadSubscriptionPromiseRef.current = null;
          }
          return;
        }
        if (!isAbortError(error)) {
          console.error("[useChat] Thread subscription failed", error);
          setIsRunning(false);
        }
        throw error;
      });
      await _threadSubscriptionPromiseRef.current;
    },
    [agentId, baseClient, closeThreadSubscription, markThreadSignalsUnsupported, processStreamChunk]
  );
  useEffect(() => {
    _threadSignalsUnsupportedRef.current = false;
    return closeThreadSubscription;
  }, [agentId, resourceId, threadId, closeThreadSubscription]);
  useEffect(() => {
    if (!threadId || threadSignalsDisabled) {
      closeThreadSubscription();
      return;
    }
    void ensureThreadSubscription({ threadId, resourceId: resourceId || agentId }).catch((error) => {
      if (!isAbortError(error)) {
        console.error("[useChat] Thread subscription failed", error);
      }
    });
  }, [agentId, closeThreadSubscription, ensureThreadSubscription, resourceId, threadId, threadSignalsDisabled]);
  const generate = async ({
    coreUserMessages,
    requestContext,
    threadId: threadId2,
    modelSettings,
    signal,
    onFinish,
    tracingOptions,
    clientTools
  }) => {
    const {
      frequencyPenalty,
      presencePenalty,
      maxRetries,
      maxTokens,
      temperature,
      topK,
      topP,
      instructions,
      providerOptions,
      maxSteps,
      requireToolApproval
    } = modelSettings || {};
    const resolvedRequestContext = requestContext ?? propsRequestContext;
    const resolvedClientTools = clientTools ?? hookClientTools;
    _requestContext.current = resolvedRequestContext;
    setIsRunning(true);
    const clientWithAbort = new MastraClient({
      ...baseClient.options,
      abortSignal: signal
    });
    const agent = clientWithAbort.getAgent(agentId);
    const runId = v4();
    _currentRunId.current = runId;
    const response = await agent.generate(coreUserMessages, {
      runId,
      maxSteps,
      modelSettings: {
        frequencyPenalty,
        presencePenalty,
        maxRetries,
        maxOutputTokens: maxTokens,
        temperature,
        topK,
        topP
      },
      instructions,
      requestContext: resolvedRequestContext,
      ...threadId2 ? { memory: { thread: threadId2, resource: resourceId || agentId } } : {},
      providerOptions,
      tracingOptions,
      requireToolApproval,
      clientTools: resolvedClientTools
    });
    if (response.finishReason === "suspended" && response.suspendPayload) {
      const { toolCallId, toolName, args } = response.suspendPayload;
      if (response.response?.uiMessages) {
        const dbMessages = dbFromServerUiMessages(response.response.uiMessages, {
          mode: "generate",
          requireApprovalMetadata: {
            [toolName]: { toolCallId, toolName, args }
          }
        });
        setMessages((prev) => [...prev, ...dbMessages]);
      }
      setIsRunning(false);
      return;
    }
    setIsRunning(false);
    if (response && "uiMessages" in response.response && response.response.uiMessages) {
      const dbMessages = dbFromServerUiMessages(response.response.uiMessages, { mode: "generate" });
      void onFinish?.(dbMessages);
      setMessages((prev) => [...prev, ...dbMessages]);
    }
  };
  const stream = async ({
    coreUserMessages,
    requestContext,
    threadId: threadId2,
    onChunk,
    modelSettings,
    signal,
    tracingOptions,
    clientTools,
    signalId,
    clientMessageId
  }) => {
    const {
      frequencyPenalty,
      presencePenalty,
      maxRetries,
      maxTokens,
      temperature,
      topK,
      topP,
      instructions,
      providerOptions,
      maxSteps,
      requireToolApproval
    } = modelSettings || {};
    const resolvedRequestContext = requestContext ?? propsRequestContext;
    const resolvedClientTools = clientTools ?? hookClientTools;
    const signalContinuationOptions = {
      maxSteps,
      modelSettings: {
        frequencyPenalty,
        presencePenalty,
        maxRetries,
        maxOutputTokens: maxTokens,
        temperature,
        topK,
        topP
      },
      instructions,
      providerOptions,
      requireToolApproval,
      tracingOptions
    };
    _requestContext.current = resolvedRequestContext;
    setIsRunning(true);
    _streamAbortRef.current?.abort();
    const internalAbort = new AbortController();
    _streamAbortRef.current = internalAbort;
    if (signal) {
      if (signal.aborted) internalAbort.abort();
      else signal.addEventListener("abort", () => internalAbort.abort(), { once: true });
    }
    const clientWithAbort = new MastraClient({
      ...baseClient.options,
      abortSignal: internalAbort.signal
    });
    const agent = clientWithAbort.getAgent(agentId);
    const streamWithLegacyRoute = async () => {
      const runId = v4();
      const response = await agent.stream(coreUserMessages, {
        runId,
        maxSteps,
        untilIdle: true,
        modelSettings: {
          frequencyPenalty,
          presencePenalty,
          maxRetries,
          maxOutputTokens: maxTokens,
          temperature,
          topK,
          topP
        },
        instructions,
        requestContext: resolvedRequestContext,
        ...threadId2 ? { memory: { thread: threadId2, resource: resourceId || agentId } } : {},
        providerOptions,
        requireToolApproval,
        tracingOptions,
        clientTools: resolvedClientTools
      });
      _onChunk.current = onChunk;
      _currentRunId.current = runId;
      await response.processDataStream({
        onChunk: (chunk) => processStreamChunk(chunk, onChunk)
      });
      if (_streamAbortRef.current === internalAbort) {
        _streamAbortRef.current = null;
      }
      setIsRunning(false);
    };
    if (!threadId2 || _threadSignalsUnsupportedRef.current || threadSignalsDisabled) {
      await streamWithLegacyRoute();
      return;
    }
    _onChunk.current = onChunk;
    await ensureThreadSubscription({ threadId: threadId2, resourceId: resourceId || agentId });
    if (_threadSignalsUnsupportedRef.current) {
      await streamWithLegacyRoute();
      return;
    }
    const resolvedSignalId = signalId ?? v4();
    const messageContents = getSignalContents(coreUserMessages);
    const streamOptions = {
      maxSteps,
      modelSettings: {
        frequencyPenalty,
        presencePenalty,
        maxRetries,
        maxOutputTokens: maxTokens,
        temperature,
        topK,
        topP
      },
      instructions,
      requestContext: resolvedRequestContext,
      providerOptions,
      requireToolApproval,
      tracingOptions
    };
    try {
      const result = await agent.sendMessage({
        message: clientMessageId ? { contents: messageContents, metadata: { [CLIENT_MESSAGE_ID_KEY]: clientMessageId } } : messageContents,
        resourceId: resourceId || agentId,
        threadId: threadId2,
        ifIdle: {
          streamOptions: {
            ...signalContinuationOptions,
            requestContext: resolvedRequestContext,
            clientTools: resolvedClientTools
          }
        }
      });
      const echoedSignalId = result.signal && typeof result.signal === "object" && "id" in result.signal && typeof result.signal.id === "string" ? result.signal.id : resolvedSignalId;
      onSignalSent?.(echoedSignalId, getSignalPreview(coreUserMessages));
      if (pendingToolApprovalIdsRef.current.size > 0) {
        setIsRunning(false);
      }
    } catch (error) {
      if (isThreadSignalUnsupportedError(error)) {
        onSignalSent?.(resolvedSignalId, getSignalPreview(coreUserMessages));
        try {
          await agent.sendSignal({
            signal: {
              id: resolvedSignalId,
              type: "user-message",
              contents: messageContents
            },
            resourceId: resourceId || agentId,
            threadId: threadId2,
            ifIdle: { streamOptions }
          });
          return;
        } catch (signalError) {
          onSignalEcho?.(resolvedSignalId);
          if (isThreadSignalUnsupportedError(signalError)) {
            markThreadSignalsUnsupported();
            setMessages((prev) => [...prev, fromCoreUserMessagesToMastraDBMessage(coreUserMessages)]);
            await streamWithLegacyRoute();
            return;
          }
          throw signalError;
        }
      }
      throw error;
    }
    if (_streamAbortRef.current === internalAbort) {
      _streamAbortRef.current = null;
    }
  };
  const network = async ({
    coreUserMessages,
    requestContext,
    threadId: threadId2,
    onNetworkChunk,
    modelSettings,
    signal,
    tracingOptions
  }) => {
    const { frequencyPenalty, presencePenalty, maxRetries, maxTokens, temperature, topK, topP, maxSteps } = modelSettings || {};
    const resolvedRequestContext = requestContext ?? propsRequestContext;
    _requestContext.current = resolvedRequestContext;
    setIsRunning(true);
    const clientWithAbort = new MastraClient({
      ...baseClient.options,
      abortSignal: signal
    });
    const agent = clientWithAbort.getAgent(agentId);
    const runId = v4();
    const response = await agent.network(coreUserMessages, {
      maxSteps,
      modelSettings: {
        frequencyPenalty,
        presencePenalty,
        maxRetries,
        maxOutputTokens: maxTokens,
        temperature,
        topK,
        topP
      },
      runId,
      requestContext: resolvedRequestContext,
      ...threadId2 ? { memory: { thread: threadId2, resource: resourceId || agentId } } : {},
      tracingOptions
    });
    _onNetworkChunk.current = onNetworkChunk;
    _networkRunId.current = runId;
    await response.processDataStream({
      onChunk: async (chunk) => {
        setMessages((prev) => accumulateNetworkChunk({ chunk, conversation: prev, metadata: { mode: "network" } }));
        void onNetworkChunk?.(chunk);
      }
    });
    setMessages((prev) => finishStreamingAssistantMessage(prev));
    setIsRunning(false);
  };
  const handleCancelRun = () => {
    _streamAbortRef.current?.abort();
    _streamAbortRef.current = null;
    const threadSubscription = _threadSubscriptionRef.current;
    void Promise.resolve(threadSubscription?.abort?.()).catch((error) => {
      console.error("[useChat] Failed to abort thread subscription", error);
    });
    closeThreadSubscription();
    setMessages((prev) => finishStreamingAssistantMessage(prev));
    pendingToolApprovalIdsRef.current.clear();
    setIsAwaitingToolApproval(false);
    setIsRunning(false);
    _currentRunId.current = void 0;
    _onChunk.current = void 0;
    _networkRunId.current = void 0;
    _onNetworkChunk.current = void 0;
    _requestContext.current = void 0;
  };
  const approveToolCall = async (toolCallId) => {
    const onChunk = _onChunk.current;
    const currentRunId = _currentRunId.current;
    if (!currentRunId)
      return console.info("[approveToolCall] approveToolCall can only be called after a stream has started");
    setIsRunning(true);
    setToolCallApprovals((prev) => ({ ...prev, [toolCallId]: { status: "approved" } }));
    const agent = baseClient.getAgent(agentId);
    if (_threadSubscriptionKeyRef.current && threadId) {
      try {
        await agent.sendToolApproval({
          resourceId: resourceId || agentId,
          threadId,
          toolCallId,
          approved: true,
          requestContext: _requestContext.current
        });
        pendingToolApprovalIdsRef.current.delete(toolCallId);
        setIsAwaitingToolApproval(pendingToolApprovalIdsRef.current.size > 0);
        setIsRunning(false);
      } catch (error) {
        setToolCallApprovals((prev) => {
          const next = { ...prev };
          delete next[toolCallId];
          return next;
        });
        setIsRunning(false);
        throw error;
      }
      return;
    }
    const response = await agent.approveToolCall({
      runId: currentRunId,
      toolCallId,
      requestContext: _requestContext.current
    });
    await response.processDataStream({
      onChunk: async (chunk) => {
        await processStreamChunk(chunk, onChunk);
      }
    });
    setIsRunning(false);
  };
  const declineToolCall = async (toolCallId) => {
    const onChunk = _onChunk.current;
    const currentRunId = _currentRunId.current;
    if (!currentRunId)
      return console.info("[declineToolCall] declineToolCall can only be called after a stream has started");
    setIsRunning(true);
    setToolCallApprovals((prev) => ({ ...prev, [toolCallId]: { status: "declined" } }));
    const agent = baseClient.getAgent(agentId);
    if (_threadSubscriptionKeyRef.current && threadId) {
      try {
        await agent.sendToolApproval({
          resourceId: resourceId || agentId,
          threadId,
          toolCallId,
          approved: false,
          requestContext: _requestContext.current
        });
        pendingToolApprovalIdsRef.current.delete(toolCallId);
        setIsAwaitingToolApproval(pendingToolApprovalIdsRef.current.size > 0);
        setIsRunning(false);
      } catch (error) {
        setToolCallApprovals((prev) => {
          const next = { ...prev };
          delete next[toolCallId];
          return next;
        });
        setIsRunning(false);
        throw error;
      }
      return;
    }
    const response = await agent.declineToolCall({
      runId: currentRunId,
      toolCallId,
      requestContext: _requestContext.current
    });
    await response.processDataStream({
      onChunk: async (chunk) => {
        await processStreamChunk(chunk, onChunk);
      }
    });
    setIsRunning(false);
  };
  const approveToolCallGenerate = async (toolCallId) => {
    const currentRunId = _currentRunId.current;
    if (!currentRunId)
      return console.info(
        "[approveToolCallGenerate] approveToolCallGenerate can only be called after a generate has started"
      );
    setIsRunning(true);
    setToolCallApprovals((prev) => ({ ...prev, [toolCallId]: { status: "approved" } }));
    const agent = baseClient.getAgent(agentId);
    const response = await agent.approveToolCallGenerate({
      runId: currentRunId,
      toolCallId,
      requestContext: _requestContext.current
    });
    if (response && "uiMessages" in response.response && response.response.uiMessages) {
      const dbMessages = dbFromServerUiMessages(response.response.uiMessages, { mode: "generate" });
      setMessages((prev) => [...prev, ...dbMessages]);
    }
    setIsRunning(false);
  };
  const declineToolCallGenerate = async (toolCallId) => {
    const currentRunId = _currentRunId.current;
    if (!currentRunId)
      return console.info(
        "[declineToolCallGenerate] declineToolCallGenerate can only be called after a generate has started"
      );
    setIsRunning(true);
    setToolCallApprovals((prev) => ({ ...prev, [toolCallId]: { status: "declined" } }));
    const agent = baseClient.getAgent(agentId);
    const response = await agent.declineToolCallGenerate({
      runId: currentRunId,
      toolCallId,
      requestContext: _requestContext.current
    });
    if (response && "uiMessages" in response.response && response.response.uiMessages) {
      const dbMessages = dbFromServerUiMessages(response.response.uiMessages, { mode: "generate" });
      setMessages((prev) => [...prev, ...dbMessages]);
    }
    setIsRunning(false);
  };
  const approveNetworkToolCall = async (toolName, runId) => {
    const onNetworkChunk = _onNetworkChunk.current;
    const networkRunId = runId || _networkRunId.current;
    if (!networkRunId)
      return console.info(
        "[approveNetworkToolCall] approveNetworkToolCall can only be called after a network stream has started"
      );
    setIsRunning(true);
    setNetworkToolCallApprovals((prev) => ({
      ...prev,
      [runId ? `${runId}-${toolName}` : toolName]: { status: "approved" }
    }));
    const agent = baseClient.getAgent(agentId);
    const response = await agent.approveNetworkToolCall({
      runId: networkRunId,
      requestContext: _requestContext.current
    });
    await response.processDataStream({
      onChunk: async (chunk) => {
        setMessages((prev) => accumulateNetworkChunk({ chunk, conversation: prev, metadata: { mode: "network" } }));
        void onNetworkChunk?.(chunk);
      }
    });
    setMessages((prev) => finishStreamingAssistantMessage(prev));
    setIsRunning(false);
  };
  const declineNetworkToolCall = async (toolName, runId) => {
    const onNetworkChunk = _onNetworkChunk.current;
    const networkRunId = runId || _networkRunId.current;
    if (!networkRunId)
      return console.info(
        "[declineNetworkToolCall] declineNetworkToolCall can only be called after a network stream has started"
      );
    setIsRunning(true);
    setNetworkToolCallApprovals((prev) => ({
      ...prev,
      [runId ? `${runId}-${toolName}` : toolName]: { status: "declined" }
    }));
    const agent = baseClient.getAgent(agentId);
    const response = await agent.declineNetworkToolCall({
      runId: networkRunId,
      requestContext: _requestContext.current
    });
    await response.processDataStream({
      onChunk: async (chunk) => {
        setMessages((prev) => accumulateNetworkChunk({ chunk, conversation: prev, metadata: { mode: "network" } }));
        void onNetworkChunk?.(chunk);
      }
    });
    setMessages((prev) => finishStreamingAssistantMessage(prev));
    setIsRunning(false);
  };
  const sendMessage = async ({ mode = "stream", ...args }) => {
    const nextMessage = { role: "user", content: [{ type: "text", text: args.message }] };
    const coreUserMessages = [nextMessage];
    if (args.coreUserMessages) {
      coreUserMessages.push(...args.coreUserMessages);
    }
    const dbUserMessage = fromCoreUserMessagesToMastraDBMessage(coreUserMessages);
    const clientSetId = mode === "stream" && args.threadId && !_threadSignalsUnsupportedRef.current && !threadSignalsDisabled ? `client-set-${v4()}` : void 0;
    const signalId = clientSetId;
    const clientMessageId = clientSetId;
    if (signalId) {
      const metadata = {
        ...dbUserMessage.content.metadata,
        mode: "stream",
        status: "pending",
        [CLIENT_MESSAGE_ID_KEY]: clientMessageId
      };
      const pendingMessage = { ...dbUserMessage, id: clientSetId, content: { ...dbUserMessage.content, metadata } };
      setMessages((s) => [...s, pendingMessage]);
    } else {
      setMessages((s) => [...s, dbUserMessage]);
    }
    if (mode === "generate") {
      await generate({ ...args, coreUserMessages });
    } else if (mode === "stream") {
      await stream({ ...args, coreUserMessages, signalId, clientMessageId });
    } else if (mode === "network") {
      await network({ ...args, coreUserMessages });
    }
  };
  return {
    setMessages,
    sendMessage,
    isRunning,
    isAwaitingToolApproval,
    messages,
    approveToolCall,
    declineToolCall,
    approveToolCallGenerate,
    declineToolCallGenerate,
    cancelRun: handleCancelRun,
    toolCallApprovals,
    approveNetworkToolCall,
    declineNetworkToolCall,
    networkToolCallApprovals
  };
};
var IconSizes = {
  sm: "mastra:[&>svg]:size-3",
  md: "mastra:[&>svg]:size-4",
  lg: "mastra:[&>svg]:size-5"
};
var Icon = ({ children, className, size = "md", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || IconSizes[size], ...props, children });
};
var EntityContext = createContext({
  expanded: false,
  setExpanded: () => {
  },
  variant: "initial",
  disabled: false
});
var EntityProvider = EntityContext.Provider;
var useEntity = () => useContext(EntityContext);
var Entity = ({
  className,
  variant = "initial",
  initialExpanded = false,
  disabled = false,
  ...props
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  return /* @__PURE__ */ jsx(EntityProvider, { value: { expanded, setExpanded, variant, disabled }, children: /* @__PURE__ */ jsx("div", { className, ...props }) });
};
var EntityTriggerClass = twMerge(
  "mastra:aria-disabled:cursor-not-allowed mastra:aria-disabled:bg-surface5 mastra:aria-disabled:text-text3",
  "mastra:aria-expanded:rounded-b-none mastra:aria-expanded:border-b-0",
  "mastra:bg-surface3 mastra:text-text6 mastra:hover:bg-surface4 mastra:active:bg-surface5",
  "mastra:rounded-lg mastra:py-2 mastra:px-4 mastra:border mastra:border-border1",
  "mastra:cursor-pointer mastra:inline-flex mastra:items-center mastra:gap-1 mastra:font-mono"
);
var EntityTriggerVariantClasses = {
  agent: "mastra:[&_svg.mastra-icon]:text-accent1",
  workflow: "mastra:[&_svg.mastra-icon]:text-accent3",
  tool: "mastra:[&_svg.mastra-icon]:text-accent6",
  memory: "mastra:[&_svg.mastra-icon]:text-accent2",
  initial: "mastra:[&_svg.mastra-icon]:text-text3"
};
var EntityTrigger = ({ className, children, ...props }) => {
  const { expanded, setExpanded, variant, disabled } = useEntity();
  const handleClick = (e) => {
    if (disabled) return;
    setExpanded(!expanded);
    props?.onClick?.(e);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: className || twMerge(EntityTriggerClass, !disabled && EntityTriggerVariantClasses[variant]),
      ...props,
      onClick: handleClick,
      "aria-expanded": expanded,
      "aria-disabled": disabled,
      children
    }
  );
};
var EntityContentClass = twMerge(
  "mastra:space-y-4",
  "mastra:rounded-lg mastra:rounded-tl-none mastra:p-4 mastra:border mastra:border-border1 mastra:-mt-[0.5px]",
  "mastra:bg-surface3 mastra:text-text6"
);
var EntityContent = ({ className, ...props }) => {
  const { expanded } = useEntity();
  if (!expanded) return null;
  return /* @__PURE__ */ jsx("div", { className: className || EntityContentClass, ...props });
};
var EntityCaret = ({ className, ...props }) => {
  const { expanded } = useEntity();
  return /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(
    ChevronDownIcon,
    {
      className: twMerge(
        `mastra:text-text3 mastra:transition-transform mastra:duration-200 mastra:ease-in-out`,
        expanded ? "mastra:rotate-0" : "mastra:-rotate-90",
        className
      ),
      ...props
    }
  ) });
};
var ToolApprovalClass = twMerge(
  "mastra:rounded-lg mastra:border mastra:border-border1 mastra:max-w-1/2 mastra:mt-2",
  "mastra:bg-surface3 mastra:text-text6"
);
var ToolApproval = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || ToolApprovalClass, ...props });
};
var ToolApprovalTitleClass = twMerge("mastra:text-text6 mastra:inline-flex mastra:items-center mastra:gap-1");
var ToolApprovalTitle = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || ToolApprovalTitleClass, ...props });
};
var ToolApprovalHeaderClass = twMerge(
  "mastra:flex mastra:justify-between mastra:items-center mastra:gap-2",
  "mastra:border-b mastra:border-border1 mastra:px-4 mastra:py-2"
);
var ToolApprovalHeader = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || ToolApprovalHeaderClass, ...props });
};
var ToolApprovalContentClass = twMerge("mastra:text-text6 mastra:p-4");
var ToolApprovalContent = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || ToolApprovalContentClass, ...props });
};
var ToolApprovalActionsClass = twMerge("mastra:flex mastra:gap-2 mastra:items-center");
var ToolApprovalActions = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || ToolApprovalActionsClass, ...props });
};
var EntryClass = "mastra:space-y-2";
var Entry = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || EntryClass, ...props });
};
var EntryTitleClass = "mastra:font-mono mastra:text-sm mastra:text-text3";
var EntryTitle = ({ className, as: Root = "h3", ...props }) => {
  return /* @__PURE__ */ jsx(Root, { className: className || EntryTitleClass, ...props });
};
var Tooltip = ({ children }) => {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(Root, { children }) });
};
var TooltipContentClass = "mastra:bg-surface4 mastra:text-text6 mastra mastra:rounded-lg mastra:py-1 mastra:px-2 mastra:text-xs mastra:border mastra:border-border1 mastra-tooltip-enter";
var TooltipContent = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx(TooltipPortal, { children: /* @__PURE__ */ jsx(TooltipContent$1, { className: className || TooltipContentClass, ...props, children }) });
};
var TooltipTrigger = (props) => {
  return /* @__PURE__ */ jsx(TooltipTrigger$1, { ...props, asChild: true });
};
var IconButtonClass = "mastra:text-text3 mastra:hover:text-text6 mastra:active:text-text6 mastra:hover:bg-surface4 mastra:active:bg-surface5 mastra:rounded-md mastra:cursor-pointer";
var IconButton = ({ children, tooltip, size = "md", className, ...props }) => {
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        className: className || twMerge(IconButtonClass, size === "md" && "mastra:p-0.5", size === "lg" && "mastra:p-1"),
        children: /* @__PURE__ */ jsx(Icon, { size, children })
      }
    ) }),
    /* @__PURE__ */ jsx(TooltipContent, { children: tooltip })
  ] });
};
async function highlight(code, lang) {
  const out = await codeToHast(code, {
    lang,
    theme: "dracula-soft"
  });
  return toJsxRuntime(out, {
    Fragment: Fragment$1,
    jsx: jsx,
    jsxs: jsxs
  });
}
var CodeBlockClass = "mastra:rounded-lg mastra:[&>pre]:p-4 mastra:overflow-hidden mastra:[&>pre]:!bg-surface4 mastra:[&>pre>code]:leading-5 mastra:relative";
var CodeBlock = ({ code, language, className, cta }) => {
  const [nodes, setNodes] = useState(null);
  useLayoutEffect(() => {
    void highlight(code, language).then(setNodes);
  }, [language]);
  return /* @__PURE__ */ jsxs("div", { className: className || CodeBlockClass, children: [
    nodes ?? null,
    cta
  ] });
};
var CodeCopyButton = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    void navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "mastra:absolute mastra:top-2 mastra:right-2", children: /* @__PURE__ */ jsx(IconButton, { tooltip: "Copy", onClick: handleCopy, children: isCopied ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(CopyIcon, {}) }) });
};
var AgentIcon = ({ className, ...props }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "17",
    height: "16",
    viewBox: "0 0 17 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    className: twMerge("mastra-icon", className),
    children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.5 15C10.3565 15 12.137 14.2625 13.4497 12.9497C14.7625 11.637 15.5 9.85652 15.5 8C15.5 6.14348 14.7625 4.36301 13.4497 3.05025C12.137 1.7375 10.3565 1 8.5 1C6.64348 1 4.86301 1.7375 3.55025 3.05025C2.2375 4.36301 1.5 6.14348 1.5 8C1.5 9.85652 2.2375 11.637 3.55025 12.9497C4.86301 14.2625 6.64348 15 8.5 15ZM5.621 10.879L4.611 11.889C3.84179 11.1198 3.31794 10.1398 3.1057 9.07291C2.89346 8.00601 3.00236 6.90013 3.41864 5.89512C3.83491 4.89012 4.53986 4.03112 5.44434 3.42676C6.34881 2.8224 7.41219 2.49983 8.5 2.49983C9.58781 2.49983 10.6512 2.8224 11.5557 3.42676C12.4601 4.03112 13.1651 4.89012 13.5814 5.89512C13.9976 6.90013 14.1065 8.00601 13.8943 9.07291C13.6821 10.1398 13.1582 11.1198 12.389 11.889L11.379 10.879C11.1004 10.6003 10.7696 10.3792 10.4055 10.2284C10.0414 10.0776 9.6511 9.99995 9.257 10H7.743C7.3489 9.99995 6.95865 10.0776 6.59455 10.2284C6.23045 10.3792 5.89963 10.6003 5.621 10.879Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M8.5 4C7.96957 4 7.46086 4.21071 7.08579 4.58579C6.71071 4.96086 6.5 5.46957 6.5 6V6.5C6.5 7.03043 6.71071 7.53914 7.08579 7.91421C7.46086 8.28929 7.96957 8.5 8.5 8.5C9.03043 8.5 9.53914 8.28929 9.91421 7.91421C10.2893 7.53914 10.5 7.03043 10.5 6.5V6C10.5 5.46957 10.2893 4.96086 9.91421 4.58579C9.53914 4.21071 9.03043 4 8.5 4Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
var ToolsIcon = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "17",
    height: "16",
    viewBox: "0 0 17 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    className: twMerge("mastra-icon", className),
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.5605 1.42351C8.0791 0.904904 8.92215 0.906157 9.4395 1.42351L10.6922 2.67617C11.2108 3.19477 11.2095 4.03782 10.6922 4.55517L9.4395 5.80783C8.9209 6.32643 8.07785 6.32518 7.5605 5.80783L6.30784 4.55517C5.78923 4.03656 5.79049 3.19352 6.30784 2.67617L7.5605 1.42351ZM3.17618 5.80783C3.69478 5.28923 4.53782 5.29048 5.05517 5.80783L6.30784 7.0605C6.82644 7.5791 6.82519 8.42214 6.30784 8.93949L5.05517 10.1922C4.53657 10.7108 3.69353 10.7095 3.17618 10.1922L1.92351 8.93949C1.40491 8.42089 1.40616 7.57785 1.92351 7.0605L3.17618 5.80783ZM11.9448 5.80783C12.4634 5.28923 13.3065 5.29048 13.8238 5.80783L15.0765 7.0605C15.5951 7.5791 15.5938 8.42214 15.0765 8.93949L13.8238 10.1922C13.3052 10.7108 12.4622 10.7095 11.9448 10.1922L10.6922 8.93949C10.1736 8.42089 10.1748 7.57785 10.6922 7.0605L11.9448 5.80783ZM7.5605 10.1922C8.0791 9.67355 8.92215 9.67481 9.4395 10.1922L10.6922 11.4448C11.2108 11.9634 11.2095 12.8065 10.6922 13.3238L9.4395 14.5765C8.9209 15.0951 8.07785 15.0938 7.5605 14.5765L6.30784 13.3238C5.78923 12.8052 5.79049 11.9622 6.30784 11.4448L7.5605 10.1922Z",
        fill: "currentColor"
      }
    )
  }
);
var WorkflowIcon = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "17",
    height: "16",
    viewBox: "0 0 17 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    className: twMerge("mastra-icon", className),
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.24388 2.4018C6.24388 2.0394 6.53767 1.74561 6.90008 1.74561H10.0991C10.4614 1.74561 10.7553 2.0394 10.7553 2.4018V4.57546C10.7553 4.93787 10.4614 5.23166 10.0991 5.23166H9.31982V7.35469L10.0033 9.22664C9.90442 9.20146 9.80035 9.1761 9.6915 9.14986L9.62652 9.13422C9.30473 9.05687 8.92256 8.96501 8.61993 8.84491C8.5819 8.82981 8.54147 8.81292 8.49957 8.79391C8.45767 8.81292 8.41724 8.82981 8.3792 8.84491C8.07657 8.96501 7.6944 9.05687 7.37261 9.13422L7.30763 9.14986C7.19879 9.1761 7.09471 9.20146 6.99577 9.22664L7.67932 7.35469V5.23166H6.90008C6.53767 5.23166 6.24388 4.93787 6.24388 4.57546V2.4018ZM6.99577 9.22664C6.99577 9.22664 6.99578 9.22664 6.99577 9.22664L6.43283 10.7683H6.81806C7.18047 10.7683 7.47426 11.0622 7.47426 11.4245V13.5982C7.47426 13.9606 7.18047 14.2544 6.81806 14.2544H3.61909C3.25668 14.2544 2.96289 13.9606 2.96289 13.5982V11.4245C2.96289 11.0622 3.25668 10.7683 3.61909 10.7683H4.26617C4.2921 10.4663 4.32783 10.1494 4.37744 9.85171C4.43762 9.49063 4.52982 9.08135 4.68998 8.76102C4.93975 8.2615 5.44743 8.01751 5.7771 7.88788C6.14684 7.74249 6.57537 7.63889 6.92317 7.55505C7.24707 7.47696 7.49576 7.41679 7.67932 7.35469L6.99577 9.22664ZM6.43283 10.7683L6.99577 9.22664C6.75846 9.28705 6.55067 9.34646 6.37745 9.41458C6.22784 9.47341 6.1623 9.51712 6.14023 9.53254C6.09752 9.63631 6.04409 9.83055 5.99562 10.1214C5.96201 10.3231 5.93498 10.5439 5.91341 10.7683H6.43283ZM10.0033 9.22664L9.31982 7.35469C9.50338 7.41679 9.75206 7.47696 10.076 7.55505C10.4238 7.63889 10.8523 7.74249 11.2221 7.88788C11.5517 8.01751 12.0594 8.2615 12.3091 8.76102C12.4693 9.08135 12.5615 9.49063 12.6217 9.85171C12.6713 10.1494 12.707 10.4663 12.733 10.7683H13.38C13.7424 10.7683 14.0362 11.0622 14.0362 11.4245V13.5982C14.0362 13.9606 13.7424 14.2544 13.38 14.2544H10.1811C9.81867 14.2544 9.52488 13.9606 9.52488 13.5982V11.4245C9.52488 11.0622 9.81867 10.7683 10.1811 10.7683H10.5663L10.0033 9.22664ZM10.0033 9.22664L10.5663 10.7683H11.0857C11.0642 10.5439 11.0372 10.3231 11.0035 10.1214C10.9551 9.83055 10.9016 9.63631 10.8589 9.53254C10.8369 9.51712 10.7713 9.47341 10.6217 9.41458C10.4485 9.34646 10.2407 9.28705 10.0033 9.22664Z",
        fill: "currentColor"
      }
    )
  }
);
var MessageClass = "mastra:flex mastra:flex-col mastra:w-full mastra:py-4 mastra:gap-2 mastra:group";
var Message = ({ position, className, children, ...props }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: className || twMerge(
        MessageClass,
        position === "left" ? "" : "mastra:items-end mastra:[&_.mastra-message-content]:bg-surface4 mastra:[&_.mastra-message-content]:px-4"
      ),
      ...props,
      children
    }
  );
};
var MessageContentClass = "mastra:max-w-4/5 mastra:py-2 mastra:text-text6 mastra:rounded-lg mastra-message-content mastra:text-md";
var MessageContent = ({ children, className, isStreaming, ...props }) => {
  return /* @__PURE__ */ jsxs("div", { className: className || MessageContentClass, ...props, children: [
    children,
    isStreaming && /* @__PURE__ */ jsx(MessageStreaming, {})
  ] });
};
var MessageActionsClass = "mastra:gap-2 mastra:flex mastra:opacity-0 mastra:group-hover:opacity-100 mastra:group-focus-within:opacity-100 mastra:items-center";
var MessageActions = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || MessageActionsClass, ...props, children });
};
var MessageUsagesClass = "mastra:flex mastra:gap-2 mastra:items-center";
var MessageUsages = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: className || MessageUsagesClass, ...props, children });
};
var MessageUsageClass = "mastra:flex mastra:gap-2 mastra:items-center mastra:font-mono mastra:text-xs mastra:bg-surface3 mastra:rounded-lg mastra:px-2 mastra:py-1";
var MessageUsage = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx("dl", { className: className || MessageUsageClass, ...props, children });
};
var MessageUsageEntryClass = "mastra:text-text3 mastra:text-xs mastra:flex mastra:gap-1 mastra:items-center";
var MessageUsageEntry = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx("dt", { className: className || MessageUsageEntryClass, ...props, children });
};
var MessageUsageValueClass = "mastra:text-text6 mastra:text-xs";
var MessageUsageValue = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx("dd", { className: className || MessageUsageValueClass, ...props, children });
};
var MessageListClass = "mastra:overflow-y-auto mastra:h-full mastra-list";
var MessageList = ({ children, className, ...props }) => {
  const listRef = useRef(null);
  useEffect(() => {
    const scrollToBottom = () => {
      if (!listRef.current) return;
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    };
    requestAnimationFrame(scrollToBottom);
  });
  return /* @__PURE__ */ jsx("div", { className: className || MessageListClass, ...props, ref: listRef, children });
};
var MessageStreamingClass = "mastra:inline-block mastra:w-[2px] mastra:h-[1em] mastra:bg-text5 mastra:ml-0.5 mastra:align-text-bottom mastra:animate-pulse";
var MessageStreaming = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("span", { className: className || MessageStreamingClass, ...props });
};
var isDynamicToolPart2 = (part) => (
  // `tool-invocation` is the v4 typed discriminant and must NOT be treated as a
  // v5 `tool-${string}` streaming part, even though it shares the `tool-` prefix.
  part.type === "dynamic-tool" || part.type.startsWith("tool-") && part.type !== "tool-invocation"
);
var isDataPart = (part) => part.type.startsWith("data-");
var sourceToSourceUrl = (part) => ({
  type: "source-url",
  sourceId: part.source.id,
  url: part.source.url,
  title: part.source.title,
  providerMetadata: part.providerMetadata
});
var getPartKey = (part, index) => {
  if (isDynamicToolPart2(part)) {
    return part.toolCallId ?? `${part.type}-${index}`;
  }
  switch (part.type) {
    case "text":
      return part.textId ?? `text-${index}`;
    case "reasoning":
      return part.reasoningId ?? `reasoning-${index}`;
    case "tool-invocation":
      return part.toolInvocation.toolCallId ?? `tool-invocation-${index}`;
    case "source-url":
      return part.sourceId || `source-url-${index}`;
    case "source":
      return part.source.id ?? `source-${index}`;
  }
  const id = part.id;
  return id ?? `${part.type}-${index}`;
};
var renderPart = (part, renderers, fallback) => {
  if (isDynamicToolPart2(part)) {
    return renderers.DynamicTool?.(part) ?? fallback?.(part) ?? null;
  }
  if (isDataPart(part)) {
    return renderers.Data?.(part) ?? fallback?.(part) ?? null;
  }
  switch (part.type) {
    case "text":
      return renderers.Text?.(part) ?? fallback?.(part) ?? null;
    case "reasoning":
      return renderers.Reasoning?.(part) ?? fallback?.(part) ?? null;
    case "file":
      return renderers.File?.(part) ?? fallback?.(part) ?? null;
    case "step-start":
      return renderers.StepStart?.(part) ?? fallback?.(part) ?? null;
    case "tool-invocation":
      return renderers.ToolInvocation?.(part) ?? fallback?.(part) ?? null;
    case "source":
      return renderers.SourceUrl?.(sourceToSourceUrl(part)) ?? fallback?.(part) ?? null;
    case "source-url":
      return renderers.SourceUrl?.(part) ?? fallback?.(part) ?? null;
    case "source-document":
      return renderers.SourceDocument?.(part) ?? fallback?.(part) ?? null;
    default: {
      return fallback?.(part) ?? null;
    }
  }
};
var PartRenderer = memo(({ part, renderers, fallback }) => /* @__PURE__ */ jsx(Fragment, { children: renderPart(part, renderers, fallback) }));
PartRenderer.displayName = "PartRenderer";
var joinText = (parts) => parts.filter((part) => part.type === "text").map((part) => part.text).join("");
var resolveTaskVerdict = (metadata) => {
  const verdict = metadata?.completionResult ?? metadata?.isTaskCompleteResult;
  if (!verdict) return void 0;
  return { passed: !!verdict.passed, suppressFeedback: verdict.suppressFeedback };
};
var roleRendererFor = (role, roles) => {
  switch (role) {
    case "user":
      return roles?.User;
    case "assistant":
      return roles?.Assistant;
    case "system":
      return roles?.System;
    case "signal":
      return roles?.Signal;
    default:
      return void 0;
  }
};
var MessageFactoryComponent = ({ message, roles, status, fallback, ...renderers }) => {
  const parts = message.content.parts ?? [];
  const metadata = message.content.metadata;
  let content;
  if (metadata?.status === "tripwire" && status?.Tripwire) {
    content = status.Tripwire({ text: joinText(parts), tripwire: metadata.tripwire, message });
  } else if (metadata?.status === "warning" && status?.Warning) {
    content = status.Warning({ text: joinText(parts), message });
  } else if (metadata?.status === "error" && status?.Error) {
    content = status.Error({ text: joinText(parts), message });
  } else {
    content = /* @__PURE__ */ jsx(Fragment, { children: parts.map((part, index) => /* @__PURE__ */ jsx(PartRenderer, { part, renderers, fallback }, getPartKey(part, index))) });
    if (metadata?.status === "pending" && status?.Pending) {
      content = status.Pending({ children: content, text: joinText(parts), message });
    }
    const verdict = resolveTaskVerdict(metadata);
    if (verdict && status?.Task) {
      content = /* @__PURE__ */ jsxs(Fragment, { children: [
        content,
        status.Task({ ...verdict, text: joinText(parts), message })
      ] });
    }
  }
  const RoleWrapper = roleRendererFor(message.role, roles);
  if (RoleWrapper) {
    return /* @__PURE__ */ jsx(Fragment, { children: RoleWrapper({ message, children: content }) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: content });
};
var MessageFactory = memo(MessageFactoryComponent);
MessageFactory.displayName = "MessageFactory";
function useMutation(mutationFn) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(void 0);
  const mutationFnRef = useRef(mutationFn);
  mutationFnRef.current = mutationFn;
  const reset = useCallback(() => {
    setIsPending(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setData(void 0);
  }, []);
  const mutateAsync = useCallback(async (variables) => {
    setIsPending(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    try {
      const result = await mutationFnRef.current(variables);
      setData(result);
      setIsSuccess(true);
      return result;
    } catch (err) {
      const typedError = err;
      setError(typedError);
      setIsError(true);
      throw err;
    } finally {
      setIsPending(false);
    }
  }, []);
  const mutate = useCallback(
    (variables) => {
      mutateAsync(variables).catch(() => {
      });
    },
    [mutateAsync]
  );
  return {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset
  };
}
function useStreamWorkflow({ debugMode, tracingOptions, onError }) {
  const client = useMastraClient();
  const [streamResult, setStreamResult] = useState({});
  const [isStreaming, setIsStreaming] = useState(false);
  const readerRef = useRef(null);
  const observerRef = useRef(null);
  const resumeStreamRef = useRef(null);
  const timeTravelStreamRef = useRef(null);
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (readerRef.current) {
        try {
          readerRef.current.releaseLock();
        } catch {
        }
        readerRef.current = null;
      }
      if (observerRef.current) {
        try {
          observerRef.current.releaseLock();
        } catch {
        }
        observerRef.current = null;
      }
      if (resumeStreamRef.current) {
        try {
          resumeStreamRef.current.releaseLock();
        } catch {
        }
        resumeStreamRef.current = null;
      }
      if (timeTravelStreamRef.current) {
        try {
          timeTravelStreamRef.current.releaseLock();
        } catch {
        }
        timeTravelStreamRef.current = null;
      }
    };
  }, []);
  const handleStreamError = useCallback(
    (err, defaultMessage, setStreamingState) => {
      if (err instanceof TypeError) {
        return;
      }
      const error = err instanceof Error ? err : new Error(defaultMessage);
      onError?.(error, defaultMessage);
      setStreamingState?.(false);
    },
    [onError]
  );
  const handleWorkflowFinish = useCallback((value) => {
    if (value.type === "workflow-finish") {
      const streamStatus = value.payload?.workflowStatus;
      const metadata = value.payload?.metadata;
      setStreamResult((prev) => ({
        ...prev,
        status: streamStatus
      }));
      if (streamStatus === "failed") {
        throw new Error(metadata?.errorMessage || "Workflow execution failed");
      }
    }
  }, []);
  const streamWorkflow = useMutation(
    async ({ workflowId, runId, inputData, initialState, requestContext: playgroundRequestContext, perStep }) => {
      if (readerRef.current) {
        readerRef.current.releaseLock();
      }
      if (!isMountedRef.current) return;
      setIsStreaming(true);
      setStreamResult({ input: inputData });
      const workflow = client.getWorkflow(workflowId);
      const run = await workflow.createRun({ runId });
      const stream = await run.stream({
        inputData,
        initialState,
        requestContext: playgroundRequestContext,
        closeOnSuspend: true,
        tracingOptions,
        perStep: perStep ?? debugMode
      });
      if (!stream) {
        return handleStreamError(new Error("No stream returned"), "No stream returned", setIsStreaming);
      }
      const reader = stream.getReader();
      readerRef.current = reader;
      try {
        while (true) {
          if (!isMountedRef.current) break;
          const { done, value } = await reader.read();
          if (done) break;
          if (isMountedRef.current) {
            setStreamResult((prev) => {
              const newResult = mapWorkflowStreamChunkToWatchResult(prev, value);
              return newResult;
            });
            if (value.type === "workflow-step-start") {
              setIsStreaming(true);
            }
            if (value.type === "workflow-step-suspended") {
              setIsStreaming(false);
            }
            if (value.type === "workflow-finish") {
              handleWorkflowFinish(value);
            }
          }
        }
      } catch (err) {
        handleStreamError(err, "Error streaming workflow");
      } finally {
        if (isMountedRef.current) {
          setIsStreaming(false);
        }
        if (readerRef.current) {
          readerRef.current.releaseLock();
          readerRef.current = null;
        }
      }
    }
  );
  const observeWorkflowStream = useMutation(
    async ({ workflowId, runId, storeRunResult }) => {
      if (observerRef.current) {
        observerRef.current.releaseLock();
      }
      if (!isMountedRef.current) return;
      setIsStreaming(true);
      setStreamResult(storeRunResult || {});
      if (storeRunResult?.status === "suspended") {
        setIsStreaming(false);
        return;
      }
      const workflow = client.getWorkflow(workflowId);
      const run = await workflow.createRun({ runId });
      const stream = await run.observeStream();
      if (!stream) {
        return handleStreamError(new Error("No stream returned"), "No stream returned", setIsStreaming);
      }
      const reader = stream.getReader();
      observerRef.current = reader;
      try {
        while (true) {
          if (!isMountedRef.current) break;
          const { done, value } = await reader.read();
          if (done) break;
          if (isMountedRef.current) {
            setStreamResult((prev) => {
              const newResult = mapWorkflowStreamChunkToWatchResult(prev, value);
              return newResult;
            });
            if (value.type === "workflow-step-start") {
              setIsStreaming(true);
            }
            if (value.type === "workflow-step-suspended") {
              setIsStreaming(false);
            }
            if (value.type === "workflow-finish") {
              handleWorkflowFinish(value);
            }
          }
        }
      } catch (err) {
        handleStreamError(err, "Error observing workflow");
      } finally {
        if (isMountedRef.current) {
          setIsStreaming(false);
        }
        if (observerRef.current) {
          observerRef.current.releaseLock();
          observerRef.current = null;
        }
      }
    }
  );
  const resumeWorkflowStream = useMutation(
    async ({ workflowId, runId, step, resumeData, requestContext: playgroundRequestContext, perStep }) => {
      if (resumeStreamRef.current) {
        resumeStreamRef.current.releaseLock();
      }
      if (!isMountedRef.current) return;
      setIsStreaming(true);
      const workflow = client.getWorkflow(workflowId);
      const run = await workflow.createRun({ runId });
      const stream = await run.resumeStream({
        step,
        resumeData,
        requestContext: playgroundRequestContext,
        tracingOptions,
        perStep: perStep ?? debugMode
      });
      if (!stream) {
        return handleStreamError(new Error("No stream returned"), "No stream returned", setIsStreaming);
      }
      const reader = stream.getReader();
      resumeStreamRef.current = reader;
      try {
        while (true) {
          if (!isMountedRef.current) break;
          const { done, value } = await reader.read();
          if (done) break;
          if (isMountedRef.current) {
            setStreamResult((prev) => {
              const newResult = mapWorkflowStreamChunkToWatchResult(prev, value);
              return newResult;
            });
            if (value.type === "workflow-step-start") {
              setIsStreaming(true);
            }
            if (value.type === "workflow-step-suspended") {
              setIsStreaming(false);
            }
            if (value.type === "workflow-finish") {
              handleWorkflowFinish(value);
            }
          }
        }
      } catch (err) {
        handleStreamError(err, "Error resuming workflow stream");
      } finally {
        if (isMountedRef.current) {
          setIsStreaming(false);
        }
        if (resumeStreamRef.current) {
          resumeStreamRef.current.releaseLock();
          resumeStreamRef.current = null;
        }
      }
    }
  );
  const timeTravelWorkflowStream = useMutation(
    async ({ workflowId, requestContext: playgroundRequestContext, runId, perStep, ...params }) => {
      if (timeTravelStreamRef.current) {
        timeTravelStreamRef.current.releaseLock();
      }
      if (!isMountedRef.current) return;
      setIsStreaming(true);
      const workflow = client.getWorkflow(workflowId);
      const run = await workflow.createRun({ runId });
      const stream = await run.timeTravelStream({
        ...params,
        perStep: perStep ?? debugMode,
        requestContext: playgroundRequestContext,
        tracingOptions
      });
      if (!stream) {
        return handleStreamError(new Error("No stream returned"), "No stream returned", setIsStreaming);
      }
      const reader = stream.getReader();
      timeTravelStreamRef.current = reader;
      try {
        while (true) {
          if (!isMountedRef.current) break;
          const { done, value } = await reader.read();
          if (done) break;
          if (isMountedRef.current) {
            setStreamResult((prev) => {
              const newResult = mapWorkflowStreamChunkToWatchResult(prev, value);
              return newResult;
            });
            if (value.type === "workflow-step-start") {
              setIsStreaming(true);
            }
            if (value.type === "workflow-step-suspended") {
              setIsStreaming(false);
            }
            if (value.type === "workflow-finish") {
              handleWorkflowFinish(value);
            }
          }
        }
      } catch (err) {
        handleStreamError(err, "Error time traveling workflow stream");
      } finally {
        if (isMountedRef.current) {
          setIsStreaming(false);
        }
        if (timeTravelStreamRef.current) {
          timeTravelStreamRef.current.releaseLock();
          timeTravelStreamRef.current = null;
        }
      }
    }
  );
  const closeStreamsAndReset = useCallback(() => {
    setIsStreaming(false);
    setStreamResult({});
    if (readerRef.current) {
      try {
        readerRef.current.releaseLock();
      } catch {
      }
      readerRef.current = null;
    }
    if (observerRef.current) {
      try {
        observerRef.current.releaseLock();
      } catch {
      }
      observerRef.current = null;
    }
    if (resumeStreamRef.current) {
      try {
        resumeStreamRef.current.releaseLock();
      } catch {
      }
      resumeStreamRef.current = null;
    }
    if (timeTravelStreamRef.current) {
      try {
        timeTravelStreamRef.current.releaseLock();
      } catch {
      }
      timeTravelStreamRef.current = null;
    }
  }, []);
  return {
    streamWorkflow,
    streamResult,
    isStreaming,
    observeWorkflowStream,
    closeStreamsAndReset,
    resumeWorkflowStream,
    timeTravelWorkflowStream
  };
}

// src/workflows/hooks.ts
function useCreateWorkflowRun() {
  const client = useMastraClient();
  return useMutation(async ({ workflowId, prevRunId }) => {
    try {
      const workflow = client.getWorkflow(workflowId);
      const { runId: newRunId } = await workflow.createRun({ runId: prevRunId });
      return { runId: newRunId };
    } catch (error) {
      console.error("Error creating workflow run:", error);
      throw error;
    }
  });
}
function useCancelWorkflowRun() {
  const client = useMastraClient();
  return useMutation(async ({ workflowId, runId }) => {
    try {
      const workflow = client.getWorkflow(workflowId);
      const run = await workflow.createRun({ runId });
      return run.cancelRun();
    } catch (error) {
      console.error("Error canceling workflow run:", error);
      throw error;
    }
  });
}

// src/voice/record-mic-to-file.ts
async function recordMicrophoneToFile(onFinish) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    const file = new File([blob], `recording-${Date.now()}.webm`, {
      type: "audio/webm",
      lastModified: Date.now()
    });
    stream.getTracks().forEach((track) => track.stop());
    onFinish(file);
  };
  return mediaRecorder;
}

// src/voice/play-stream-with-web-audio.ts
async function playStreamWithWebAudio(stream, onEnded) {
  const audioContext = new window.AudioContext();
  const reader = stream.getReader();
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      combinedBuffer.set(chunk, offset);
      offset += chunk.length;
    }
    const audioBuffer = await audioContext.decodeAudioData(combinedBuffer.buffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.onended = onEnded ?? null;
    source.connect(audioContext.destination);
    source.start();
    return () => {
      source.onended = null;
      source.stop();
      void audioContext.close();
    };
  } catch (error) {
    await reader.cancel().catch(() => void 0);
    await audioContext.close().catch(() => void 0);
    throw error;
  } finally {
    reader.releaseLock();
  }
}
var useSpeechRecognition = ({
  language = "en-US",
  agentId,
  requestContext
}) => {
  const client = useMastraClient();
  const [agent, setAgent] = useState(null);
  useEffect(() => {
    let cancelled = false;
    if (!agentId) {
      setAgent(null);
      return () => {
        cancelled = true;
      };
    }
    const agent2 = client.getAgent(agentId);
    const check = async () => {
      try {
        const speakers = await agent2.voice.getSpeakers(requestContext);
        if (!cancelled) {
          setAgent(speakers.length > 0 ? agent2 : null);
        }
      } catch {
        if (!cancelled) {
          setAgent(null);
        }
      }
    };
    void check();
    return () => {
      cancelled = true;
    };
  }, [agentId, client, requestContext]);
  const browserSpeechRecognition = useBrowserSpeechRecognition({ language });
  const mastraSpeechRecognition = useMastraSpeechToText({ agent, language });
  if (!agent) {
    return browserSpeechRecognition;
  }
  return mastraSpeechRecognition;
};
var useBrowserSpeechRecognition = ({ language = "en-US" }) => {
  const speechRecognitionRef = useRef(null);
  const [state, setState] = useState({
    isListening: false,
    transcript: "",
    error: null
  });
  const start = () => {
    if (!speechRecognitionRef.current) return;
    speechRecognitionRef.current.start();
  };
  const stop = () => {
    if (!speechRecognitionRef.current) return;
    speechRecognitionRef.current.stop();
  };
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setState((prev) => ({ ...prev, error: "Speech Recognition not supported in this browser" }));
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    speechRecognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.lang = language;
    recognition.onstart = () => {
      setState((prev) => ({ ...prev, isListening: true, error: null }));
    };
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      setState((prev) => ({ ...prev, transcript: finalTranscript }));
    };
    recognition.onerror = (event) => {
      setState((prev) => ({ ...prev, error: `Error: ${event.error}` }));
    };
    recognition.onend = () => setState((prev) => ({ ...prev, isListening: false }));
    return () => {
      try {
        recognition.stop();
      } catch {
      }
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      speechRecognitionRef.current = null;
    };
  }, [language]);
  return {
    ...state,
    start,
    stop
  };
};
var useMastraSpeechToText = ({
  agent,
  language
}) => {
  const [state, setState] = useState({
    isListening: false,
    transcript: "",
    error: null
  });
  const recorderRef = useRef(null);
  const sessionRef = useRef(0);
  const startInFlightRef = useRef(false);
  useEffect(() => {
    return () => {
      sessionRef.current += 1;
      startInFlightRef.current = false;
      recorderRef.current?.stop();
      recorderRef.current = null;
    };
  }, [agent]);
  const handleFinish = (session) => (file) => {
    if (!agent || session !== sessionRef.current) return;
    recorderRef.current = null;
    setState((prev) => ({ ...prev, isListening: false }));
    void agent.voice.listen(file, { language }).then((res) => {
      if (session !== sessionRef.current) return;
      setState((prev) => ({ ...prev, transcript: res.text, error: null }));
    }).catch((error) => {
      if (session !== sessionRef.current) return;
      const message = error instanceof Error ? error.message : "Failed to transcribe speech";
      setState((prev) => ({ ...prev, error: message }));
    });
  };
  const start = () => {
    if (!agent || startInFlightRef.current || recorderRef.current) return;
    startInFlightRef.current = true;
    const session = sessionRef.current;
    void recordMicrophoneToFile(handleFinish(session)).then((recorder) => {
      startInFlightRef.current = false;
      if (session !== sessionRef.current) {
        try {
          recorder.stop();
        } catch {
        }
        return;
      }
      recorderRef.current = recorder;
      setState((prev) => ({ ...prev, isListening: true, error: null }));
      recorder.start();
    }).catch((error) => {
      startInFlightRef.current = false;
      if (session !== sessionRef.current) return;
      const message = error instanceof Error ? error.message : "Failed to start speech recording";
      setState((prev) => ({ ...prev, isListening: false, error: message }));
    });
  };
  const stop = () => {
    sessionRef.current += 1;
    startInFlightRef.current = false;
    recorderRef.current?.stop();
    recorderRef.current = null;
    setState((prev) => ({ ...prev, isListening: false }));
  };
  return {
    ...state,
    start,
    stop
  };
};

export { AgentIcon, CLIENT_MESSAGE_ID_KEY, CodeBlock, CodeBlockClass, CodeCopyButton, Entity, EntityCaret, EntityContent, EntityContentClass, EntityTrigger, EntityTriggerClass, EntityTriggerVariantClasses, Entry, EntryClass, EntryTitle, EntryTitleClass, Icon, IconButton, IconButtonClass, IconSizes, MastraReactProvider, Message, MessageActions, MessageActionsClass, MessageClass, MessageContent, MessageContentClass, MessageFactory, MessageList, MessageListClass, MessageStreaming, MessageStreamingClass, MessageUsage, MessageUsageClass, MessageUsageEntry, MessageUsageEntryClass, MessageUsageValue, MessageUsageValueClass, MessageUsages, MessageUsagesClass, ToolApproval, ToolApprovalActions, ToolApprovalActionsClass, ToolApprovalClass, ToolApprovalContent, ToolApprovalContentClass, ToolApprovalHeader, ToolApprovalHeaderClass, ToolApprovalTitle, ToolApprovalTitleClass, ToolsIcon, Tooltip, TooltipContent, TooltipContentClass, TooltipTrigger, WorkflowIcon, accumulateChunk, accumulateNetworkChunk, finishStreamingAssistantMessage, fromCoreUserMessageToMastraDBMessage, fromCoreUserMessagesToMastraDBMessage, mapWorkflowStreamChunkToWatchResult, playStreamWithWebAudio, recordMicrophoneToFile, useCancelWorkflowRun, useChat, useCreateWorkflowRun, useEntity, useMastraClient, useSpeechRecognition, useStreamWorkflow };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map