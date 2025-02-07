// package com.ousaro.gamindie.config;

// import org.springframework.context.event.EventListener;
// import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
// import org.springframework.messaging.simp.user.SimpUserRegistry;
// import org.springframework.messaging.simp.user.SimpUser;
// import org.springframework.messaging.simp.user.SimpSession;
// import org.springframework.stereotype.Component;
// import org.springframework.web.socket.messaging.SessionConnectEvent;
// import org.springframework.web.socket.messaging.SessionDisconnectEvent;

// @Component
// public class WebSocketSessionTracker {

//     private final SimpUserRegistry userRegistry;

//     public WebSocketSessionTracker(SimpUserRegistry userRegistry) {
//         this.userRegistry = userRegistry;
//     }

//     @EventListener
//     public void handleWebSocketConnectListener(SessionConnectEvent event) {
//         StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//         String username = headerAccessor.getUser() != null ? headerAccessor.getUser().getName() : "UNKNOWN";
//         System.out.println("✅ New WebSocket connection: " + username);
//     }

//     @EventListener
//     public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//         StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//         String sessionId = headerAccessor.getSessionId();
//         System.out.println("❌ WebSocket disconnected: " + sessionId);
//     }

//     public void printActiveUsers() {
//         System.out.println("🔍 Active WebSocket Users:");
//         for (SimpUser user : userRegistry.getUsers()) {
//             System.out.println("🟢 " + user.getName() + " (Sessions: " + user.getSessions().size() + ")");
//             for (SimpSession session : user.getSessions()) {
//                 System.out.println("   ➝ Session ID: " + session.getId());
//             }
//         }
//     }
// }
