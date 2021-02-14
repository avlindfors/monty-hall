package com.avlindfors.montyhall.configuration;

import static com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zalando.logbook.HttpLogFormatter;
import org.zalando.logbook.json.JsonHttpLogFormatter;

@Configuration
public class LogConfig {

  @Autowired
  private ObjectMapper objectMapper;

  /**
   * Enable indented JSON log formatting.
   */
  @Bean
  public HttpLogFormatter jsonFormatter() {
    objectMapper.enable(INDENT_OUTPUT);
    return new JsonHttpLogFormatter(objectMapper);
  }
}
