# Gamindie

**A Social Media Platform for Indie Game Developers and Game Testers**

# Gamindie

## Overview
Gamindie is a social media MVP designed to connect indie game developers and game testers. The platform enables users to share their projects, collaborate, and receive valuable feedback. It includes essential social media functionalities such as user authentication, post management, friendships, and real-time chat.

## Features
- **User Authentication & Authorization**
- **Post Creation & Deletion**
- **User Profile Management** (Edit Profile)
- **Friendships** (Friend Requests, Adding/Removing Friends)
- **Real-Time Chat System** (Powered by WebSockets)

## Technologies Used
- **Backend:** Spring Boot
- **Frontend:** Angular
- **Database:** PostgreSQL
- **Communication:** REST APIs, WebSockets
- **Containerization:** Docker

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Java 17+
- Node.js & npm
- Docker
- PostgreSQL
- Make

### Installation & Running the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/Gamindie.git
   cd Gamindie
   ```
2. Use the Makefile to start the UI, Docker containers, and storage:
   ```sh
   make ui
   make docker
   make storage
   ```
3. Start the backend:
   - Navigate to `GamindieApiApplication.java`
   - Run the application in your IDE or use:
     ```sh
     ./mvnw spring-boot:run
     ```

## Future Enhancements
Gamindie is an MVP with potential for growth. Future plans include:
- **Communities:** Dedicated spaces for game developers to interact
- **Playtesting Section:** Allow testers to review and give feedback on early-stage games
- **Game Asset Store:** Enable developers to buy and sell assets
- **Portfolio Integration:** Users can showcase their projects directly on their profiles

## License
This project is licensed under the MIT License.

