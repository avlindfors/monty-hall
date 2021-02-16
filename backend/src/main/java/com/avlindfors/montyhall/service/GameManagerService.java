package com.avlindfors.montyhall.service;

import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class GameManagerService {

  private static final int NUMBER_OF_DOORS = 3;

  /**
   * Creates an index to represent the position of one of the doors.
   */
  public int getRandomDoorIndex() {
    return ThreadLocalRandom.current().nextInt(0, NUMBER_OF_DOORS);
  }
}
