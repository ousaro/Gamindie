.PHONY: ui docker java storage api-gen

ui:
	cd gamindie-ui && npm start

docker:
	cd gamindie && docker-compose up

java:
	cd gamindie && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"

storage:
	cd storage && npm start

api-gen:
	cd gamindie-ui && npm run api-gen