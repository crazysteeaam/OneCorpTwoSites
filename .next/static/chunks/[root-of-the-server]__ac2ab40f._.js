(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/components/InfoCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>InfoCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function InfoCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            top: 40,
            right: 40,
            width: 320,
            background: '#222a',
            borderRadius: 12,
            color: '#fff',
            padding: 20,
            zIndex: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/truck.png",
                alt: "truck",
                style: {
                    width: 80
                }
            }, void 0, false, {
                fileName: "[project]/components/InfoCard.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontWeight: 'bold',
                    fontSize: 18,
                    margin: '8px 0'
                },
                children: "COMAC运输车"
            }, void 0, false, {
                fileName: "[project]/components/InfoCard.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "车牌：沪A01984"
            }, void 0, false, {
                fileName: "[project]/components/InfoCard.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "车型：COMAC轻型货车"
            }, void 0, false, {
                fileName: "[project]/components/InfoCard.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "司机：张三"
            }, void 0, false, {
                fileName: "[project]/components/InfoCard.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "当前状态：运输中"
            }, void 0, false, {
                fileName: "[project]/components/InfoCard.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InfoCard.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = InfoCard;
var _c;
__turbopack_context__.k.register(_c, "InfoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/WarningModal.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>WarningModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function WarningModal() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            left: '50%',
            bottom: 40,
            transform: 'translateX(-50%)',
            width: 800,
            background: '#222c',
            borderRadius: 10,
            color: '#fff',
            padding: 24,
            zIndex: 30
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontWeight: 'bold',
                    color: '#ff0',
                    fontSize: 18
                },
                children: "货车风险预警："
            }, void 0, false, {
                fileName: "[project]/components/WarningModal.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    margin: '8px 0'
                },
                children: "沪A01984 于 2024年10月24日 13:53:12 在上海浦东耗时较平均时间长。"
            }, void 0, false, {
                fileName: "[project]/components/WarningModal.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "AI分析原因：前方其他车辆发生了交通事故，交通拥堵。"
            }, void 0, false, {
                fileName: "[project]/components/WarningModal.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 16,
                    textAlign: 'right'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            marginRight: 12,
                            padding: '6px 18px',
                            borderRadius: 6,
                            border: 'none',
                            background: '#555',
                            color: '#fff'
                        },
                        children: "关闭警告"
                    }, void 0, false, {
                        fileName: "[project]/components/WarningModal.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            background: '#09f',
                            color: '#fff',
                            padding: '6px 18px',
                            borderRadius: 6,
                            border: 'none'
                        },
                        children: "处理"
                    }, void 0, false, {
                        fileName: "[project]/components/WarningModal.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WarningModal.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/WarningModal.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = WarningModal;
var _c;
__turbopack_context__.k.register(_c, "WarningModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/styles/DashboardPanel.module.css [client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "DashboardPanel-module__7o0u8W__active",
  "cardTitle": "DashboardPanel-module__7o0u8W__cardTitle",
  "cardValue": "DashboardPanel-module__7o0u8W__cardValue",
  "danger": "DashboardPanel-module__7o0u8W__danger",
  "dashboardCard": "DashboardPanel-module__7o0u8W__dashboardCard",
  "dashboardCards": "DashboardPanel-module__7o0u8W__dashboardCards",
  "dashboardRoot": "DashboardPanel-module__7o0u8W__dashboardRoot",
  "dashboardRow": "DashboardPanel-module__7o0u8W__dashboardRow",
  "monitorCard": "DashboardPanel-module__7o0u8W__monitorCard",
  "monitorList": "DashboardPanel-module__7o0u8W__monitorList",
  "monitorTitle": "DashboardPanel-module__7o0u8W__monitorTitle",
  "overviewCard": "DashboardPanel-module__7o0u8W__overviewCard",
  "overviewCardsRow": "DashboardPanel-module__7o0u8W__overviewCardsRow",
  "overviewHeader": "DashboardPanel-module__7o0u8W__overviewHeader",
  "pieCard": "DashboardPanel-module__7o0u8W__pieCard",
  "pieCenterText": "DashboardPanel-module__7o0u8W__pieCenterText",
  "pieChartPlaceholder": "DashboardPanel-module__7o0u8W__pieChartPlaceholder",
  "pieLegend": "DashboardPanel-module__7o0u8W__pieLegend",
  "pieTitle": "DashboardPanel-module__7o0u8W__pieTitle",
  "success": "DashboardPanel-module__7o0u8W__success",
  "timeToggle": "DashboardPanel-module__7o0u8W__timeToggle",
  "trendCard": "DashboardPanel-module__7o0u8W__trendCard",
  "trendChartPlaceholder": "DashboardPanel-module__7o0u8W__trendChartPlaceholder",
  "trendTitle": "DashboardPanel-module__7o0u8W__trendTitle",
  "unit": "DashboardPanel-module__7o0u8W__unit",
  "warning": "DashboardPanel-module__7o0u8W__warning",
});
}}),
"[project]/components/DashboardPanel.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/DashboardPanel.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
const overviewData = [
    {
        title: '在途物料',
        value: 769,
        unit: ''
    },
    {
        title: '物料货值',
        value: 0.42,
        unit: '亿'
    },
    {
        title: '在途制品',
        value: 120,
        unit: ''
    },
    {
        title: '在制品货值',
        value: 150.9,
        unit: '万'
    },
    {
        title: '今日在途',
        value: 3,
        unit: ''
    },
    {
        title: '今日到达',
        value: 15,
        unit: ''
    }
];
const monitorList = [
    {
        type: 'danger',
        text: '货车异常预警: PH01984于2024年XX月XX日XX:XX:XX从上海浦东园区...'
    },
    {
        type: 'warning',
        text: '货车风险预警: PA01984于2024年XX月XX日 在上海浦东起始区, 原...'
    },
    {
        type: 'success',
        text: '货车动态正常: PA01983于2024年XX月XX日XX:XX:XX从上海浦东园区...'
    },
    {
        type: 'success',
        text: '货车动态正常: PA01984于2024年XX月XX日XX:XX:XX从上海浦东园区...'
    },
    {
        type: 'success',
        text: '货车动态正常: PA01983于2024年XX月XX日XX:XX:XX从上海浦东园区...'
    }
];
const pieData = [
    {
        name: '在途',
        value: 41523850
    },
    {
        name: '在制',
        value: 15094015
    }
];
const trendData = {
    x: [
        '2023-2',
        '2023-3',
        '2023-4',
        '2023-5',
        '2023-6',
        '2023-7'
    ],
    bar: [
        80,
        60,
        50,
        40,
        60,
        80
    ],
    line1: [
        60,
        50,
        40,
        30,
        40,
        60
    ],
    line2: [
        70,
        60,
        50,
        40,
        50,
        70
    ]
};
function DashboardPanel() {
    _s();
    const [timeType, setTimeType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('月');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardRoot,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardCards,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardCard,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].overviewHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "一司两地概况"
                                }, void 0, false, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].timeToggle,
                                    children: [
                                        '日',
                                        '月',
                                        '年'
                                    ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: timeType === t ? __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].active : '',
                                            onClick: ()=>setTimeType(t),
                                            children: t
                                        }, t, false, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/DashboardPanel.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].overviewCardsRow,
                            children: overviewData.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].overviewCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardValue,
                                            children: [
                                                item.value,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].unit,
                                                    children: item.unit
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DashboardPanel.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 63
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/DashboardPanel.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/DashboardPanel.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardCard + ' ' + __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].monitorCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].monitorTitle,
                                    children: "智能监测"
                                }, void 0, false, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].monitorList,
                                    children: monitorList.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"][item.type],
                                            children: item.text
                                        }, idx, false, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/DashboardPanel.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardCard + ' ' + __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pieCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pieTitle,
                                    children: "流转金额比例"
                                }, void 0, false, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pieChartPlaceholder,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "160",
                                            height: "160",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "80",
                                                    cy: "80",
                                                    r: "64",
                                                    stroke: "#00eaff",
                                                    strokeWidth: "24",
                                                    fill: "none",
                                                    strokeDasharray: "302 100",
                                                    strokeDashoffset: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DashboardPanel.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "80",
                                                    cy: "80",
                                                    r: "64",
                                                    stroke: "#1e2a3a",
                                                    strokeWidth: "24",
                                                    fill: "none",
                                                    strokeDasharray: "100 302",
                                                    strokeDashoffset: "302"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DashboardPanel.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pieCenterText,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: "在途"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DashboardPanel.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 20,
                                                        fontWeight: 'bold'
                                                    },
                                                    children: "96.7%"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DashboardPanel.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pieLegend,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#00eaff'
                                            },
                                            children: "在途转料"
                                        }, void 0, false, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#6c7a89',
                                                marginLeft: 16
                                            },
                                            children: "在制专制品"
                                        }, void 0, false, {
                                            fileName: "[project]/components/DashboardPanel.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/DashboardPanel.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/DashboardPanel.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/DashboardPanel.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dashboardCard + ' ' + __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].trendCard,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].trendTitle,
                            children: "工单趋势总览"
                        }, void 0, false, {
                            fileName: "[project]/components/DashboardPanel.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$DashboardPanel$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].trendChartPlaceholder,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "800",
                                height: "160",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "60",
                                        y: "60",
                                        width: "32",
                                        height: "80",
                                        fill: "#00eaff",
                                        rx: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "120",
                                        y: "80",
                                        width: "32",
                                        height: "60",
                                        fill: "#1e90ff",
                                        rx: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "180",
                                        y: "100",
                                        width: "32",
                                        height: "40",
                                        fill: "#00eaff",
                                        rx: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "240",
                                        y: "90",
                                        width: "32",
                                        height: "50",
                                        fill: "#1e90ff",
                                        rx: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "300",
                                        y: "70",
                                        width: "32",
                                        height: "70",
                                        fill: "#00eaff",
                                        rx: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "360",
                                        y: "60",
                                        width: "32",
                                        height: "80",
                                        fill: "#1e90ff",
                                        rx: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "76,100 136,110 196,120 256,130 316,110 376,100",
                                        fill: "none",
                                        stroke: "#ffea00",
                                        strokeWidth: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "76",
                                        cy: "100",
                                        r: "5",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "136",
                                        cy: "110",
                                        r: "5",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "196",
                                        cy: "120",
                                        r: "5",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "256",
                                        cy: "130",
                                        r: "5",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "316",
                                        cy: "110",
                                        r: "5",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "376",
                                        cy: "100",
                                        r: "5",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "76,120 136,130 196,140 256,150 316,130 376,120",
                                        fill: "none",
                                        stroke: "#ff5e5e",
                                        strokeWidth: "3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "76",
                                        cy: "120",
                                        r: "4",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "136",
                                        cy: "130",
                                        r: "4",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "196",
                                        cy: "140",
                                        r: "4",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "256",
                                        cy: "150",
                                        r: "4",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "316",
                                        cy: "130",
                                        r: "4",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "376",
                                        cy: "120",
                                        r: "4",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "500",
                                        y: "20",
                                        width: "18",
                                        height: "18",
                                        fill: "#00eaff",
                                        rx: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "525",
                                        y: "34",
                                        fill: "#b0c4d8",
                                        fontSize: "15",
                                        children: "进出口额"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "600",
                                        y: "20",
                                        width: "18",
                                        height: "18",
                                        fill: "#1e90ff",
                                        rx: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "625",
                                        y: "34",
                                        fill: "#b0c4d8",
                                        fontSize: "15",
                                        children: "当年累计"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "540",
                                        cy: "60",
                                        r: "7",
                                        fill: "#ffea00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "555",
                                        y: "65",
                                        fill: "#b0c4d8",
                                        fontSize: "15",
                                        children: "同比"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "600",
                                        cy: "60",
                                        r: "7",
                                        fill: "#ff5e5e"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "615",
                                        y: "65",
                                        fill: "#b0c4d8",
                                        fontSize: "15",
                                        children: "环比"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DashboardPanel.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DashboardPanel.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/DashboardPanel.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/DashboardPanel.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/DashboardPanel.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/DashboardPanel.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(DashboardPanel, "3zJiL9qcqcuBa+glMcN7AVHZ5As=");
_c = DashboardPanel;
var _c;
__turbopack_context__.k.register(_c, "DashboardPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/styles/TransportListCard.module.css [client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "card": "TransportListCard-module__Ox-XKG__card",
  "filterRow": "TransportListCard-module__Ox-XKG__filterRow",
  "header": "TransportListCard-module__Ox-XKG__header",
  "iconWrap": "TransportListCard-module__Ox-XKG__iconWrap",
  "infoWrap": "TransportListCard-module__Ox-XKG__infoWrap",
  "input": "TransportListCard-module__Ox-XKG__input",
  "listWrap": "TransportListCard-module__Ox-XKG__listWrap",
  "moreBtn": "TransportListCard-module__Ox-XKG__moreBtn",
  "row": "TransportListCard-module__Ox-XKG__row",
  "searchBtn": "TransportListCard-module__Ox-XKG__searchBtn",
  "select": "TransportListCard-module__Ox-XKG__select",
  "sortTip": "TransportListCard-module__Ox-XKG__sortTip",
  "title": "TransportListCard-module__Ox-XKG__title",
  "transportListCard": "TransportListCard-module__Ox-XKG__transportListCard",
  "truckIcon": "TransportListCard-module__Ox-XKG__truckIcon",
});
}}),
"[project]/components/TransportListCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TransportListCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/TransportListCard.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
const mockData = [
    {
        id: '1',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010010',
        plate: '沪A01983',
        weight: '200kg',
        status: '运输中',
        depart: '14:00',
        arrive: '-'
    },
    {
        id: '2',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010011',
        plate: '沪A01984',
        weight: '180kg',
        status: '已到达',
        depart: '13:20',
        arrive: '15:10'
    },
    {
        id: '3',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010012',
        plate: '沪A01985',
        weight: '220kg',
        status: '运输中',
        depart: '12:30',
        arrive: '-'
    },
    {
        id: '4',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010013',
        plate: '沪A01986',
        weight: '210kg',
        status: '运输中',
        depart: '11:00',
        arrive: '-'
    },
    {
        id: '5',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010014',
        plate: '沪A01987',
        weight: '250kg',
        status: '已到达',
        depart: '10:00',
        arrive: '12:00'
    },
    {
        id: '6',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010015',
        plate: '沪A01988',
        weight: '190kg',
        status: '运输中',
        depart: '09:30',
        arrive: '-'
    },
    {
        id: '7',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010016',
        plate: '沪A01989',
        weight: '230kg',
        status: '运输中',
        depart: '08:45',
        arrive: '-'
    },
    {
        id: '8',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010017',
        plate: '沪A01990',
        weight: '170kg',
        status: '已到达',
        depart: '07:50',
        arrive: '09:20'
    },
    {
        id: '9',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010018',
        plate: '沪A01991',
        weight: '260kg',
        status: '运输中',
        depart: '07:00',
        arrive: '-'
    },
    {
        id: '10',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010019',
        plate: '沪A01992',
        weight: '200kg',
        status: '运输中',
        depart: '06:30',
        arrive: '-'
    },
    {
        id: '11',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010020',
        plate: '沪A01993',
        weight: '240kg',
        status: '已到达',
        depart: '05:40',
        arrive: '07:10'
    },
    {
        id: '12',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010021',
        plate: '沪A01994',
        weight: '210kg',
        status: '运输中',
        depart: '05:00',
        arrive: '-'
    },
    {
        id: '13',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010022',
        plate: '沪A01995',
        weight: '220kg',
        status: '运输中',
        depart: '04:20',
        arrive: '-'
    },
    {
        id: '14',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010023',
        plate: '沪A01996',
        weight: '180kg',
        status: '已到达',
        depart: '03:30',
        arrive: '05:00'
    },
    {
        id: '15',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010024',
        plate: '沪A01997',
        weight: '250kg',
        status: '运输中',
        depart: '02:40',
        arrive: '-'
    },
    {
        id: '16',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010025',
        plate: '沪A01998',
        weight: '200kg',
        status: '运输中',
        depart: '01:50',
        arrive: '-'
    },
    {
        id: '17',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010026',
        plate: '沪A01999',
        weight: '210kg',
        status: '已到达',
        depart: '01:00',
        arrive: '02:30'
    },
    {
        id: '18',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010027',
        plate: '沪A02000',
        weight: '230kg',
        status: '运输中',
        depart: '00:20',
        arrive: '-'
    },
    {
        id: '19',
        from: 'COMAC浦东基地',
        to: 'COMAC大场基地',
        code: '010028',
        plate: '沪A02001',
        weight: '220kg',
        status: '运输中',
        depart: '23:30',
        arrive: '-'
    },
    {
        id: '20',
        from: 'COMAC大场基地',
        to: 'COMAC浦东基地',
        code: '010029',
        plate: '沪A02002',
        weight: '190kg',
        status: '已到达',
        depart: '22:40',
        arrive: '00:10'
    }
];
function TransportListCard({ data = mockData }) {
    _s();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortAsc, setSortAsc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TransportListCard.useMemo[filtered]": ()=>{
            return data.filter({
                "TransportListCard.useMemo[filtered]": (item)=>{
                    const q = search.trim();
                    if (!q) return true;
                    return item.plate.includes(q) || item.code.includes(q) || item.status.includes(q) || item.from.includes(q) || item.to.includes(q);
                }
            }["TransportListCard.useMemo[filtered]"]);
        }
    }["TransportListCard.useMemo[filtered]"], [
        search,
        data
    ]);
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TransportListCard.useMemo[sorted]": ()=>{
            return [
                ...filtered
            ].sort({
                "TransportListCard.useMemo[sorted]": (a, b)=>{
                    if (sortAsc) {
                        return a.depart.localeCompare(b.depart);
                    } else {
                        return b.depart.localeCompare(a.depart);
                    }
                }
            }["TransportListCard.useMemo[sorted]"]);
        }
    }["TransportListCard.useMemo[sorted]"], [
        filtered,
        sortAsc
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].transportListCard,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "运输列表"
                    }, void 0, false, {
                        fileName: "[project]/components/TransportListCard.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sortTip,
                        style: {
                            cursor: 'pointer'
                        },
                        onClick: ()=>setSortAsc((v)=>!v),
                        children: [
                            "按出发时间",
                            sortAsc ? '↑' : '↓',
                            "排序"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/TransportListCard.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TransportListCard.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].select,
                        disabled: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            children: "车牌号"
                        }, void 0, false, {
                            fileName: "[project]/components/TransportListCard.tsx",
                            lineNumber: 277,
                            columnNumber: 52
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/TransportListCard.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                        placeholder: "请输入搜索",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/TransportListCard.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchBtn,
                        onClick: ()=>setSearch(''),
                        children: "清空"
                    }, void 0, false, {
                        fileName: "[project]/components/TransportListCard.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TransportListCard.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].listWrap,
                style: {
                    maxHeight: '650px'
                },
                children: [
                    sorted.slice(0, 20).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].card,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].iconWrap,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/truck.png",
                                        alt: "truck",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].truckIcon
                                    }, void 0, false, {
                                        fileName: "[project]/components/TransportListCard.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/TransportListCard.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoWrap,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                                            children: [
                                                item.from,
                                                " - ",
                                                item.to
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/TransportListCard.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].row,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "运输编号"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/TransportListCard.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 43
                                                }, this),
                                                item.code,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: 16
                                                    },
                                                    children: "状态"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/TransportListCard.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 71
                                                }, this),
                                                item.status
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/TransportListCard.tsx",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].row,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "车牌"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/TransportListCard.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 43
                                                }, this),
                                                item.plate,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: 16
                                                    },
                                                    children: "实际出发"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/TransportListCard.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 70
                                                }, this),
                                                item.depart
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/TransportListCard.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].row,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "运输重量"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/TransportListCard.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 43
                                                }, this),
                                                item.weight,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: 16
                                                    },
                                                    children: "实际到达"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/TransportListCard.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 73
                                                }, this),
                                                item.arrive || '-'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/TransportListCard.tsx",
                                            lineNumber: 291,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/TransportListCard.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$TransportListCard$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].moreBtn,
                                    children: "..."
                                }, void 0, false, {
                                    fileName: "[project]/components/TransportListCard.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/components/TransportListCard.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this)),
                    sorted.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#b0c4d8',
                            textAlign: 'center',
                            marginTop: 32
                        },
                        children: "无匹配数据"
                    }, void 0, false, {
                        fileName: "[project]/components/TransportListCard.tsx",
                        lineNumber: 296,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TransportListCard.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TransportListCard.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
_s(TransportListCard, "urj6FNFqAWMx3JIhtKD2XHmIj2w=");
_c = TransportListCard;
var _c;
__turbopack_context__.k.register(_c, "TransportListCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/styles/Home.module.css [client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "container": "Home-module__g21JLG__container",
  "mapBg": "Home-module__g21JLG__mapBg",
});
}}),
"[project]/pages/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
// import MapRoute from '../components/MapRoute';
// import MapMarkers from '../components/MapMarkers';
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InfoCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InfoCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WarningModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WarningModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DashboardPanel$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DashboardPanel.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TransportListCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TransportListCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/Home.module.css [client] (css module)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// 动态引入高德地图组件，避免SSR问题
const AMapComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/components/AMapComponent.tsx [client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/components/AMapComponent.tsx [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = AMapComponent;
function Home() {
    _s();
    const [selectedRouteIdx, setSelectedRouteIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            selectedRouteIdx === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DashboardPanel$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 18,
                columnNumber: 37
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mapBg,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AMapComponent, {
                    selectedRouteIdx: selectedRouteIdx,
                    setSelectedRouteIdx: setSelectedRouteIdx
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InfoCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TransportListCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            selectedRouteIdx !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WarningModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 26,
                columnNumber: 37
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Home, "OEpOHo5K2CbArfyuLFvd4IpOY4s=");
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "AMapComponent");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__ac2ab40f._.js.map