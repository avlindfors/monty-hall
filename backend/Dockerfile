FROM openjdk:11-jdk as BUILD
WORKDIR /home/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:11-jdk
VOLUME /tmp
ARG DEPENDENCY=/home/app/target/dependency
COPY --from=BUILD ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=BUILD ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=BUILD ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.avlindfors.montyhall.MontyHallApplication"]