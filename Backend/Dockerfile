FROM openjdk:17-jdk-slim
LABEL authors="Lorenzo Paolucci"
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY target/PiattaformaPCTO_v2-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]