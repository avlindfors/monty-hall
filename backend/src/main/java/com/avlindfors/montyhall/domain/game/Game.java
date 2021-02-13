package com.avlindfors.montyhall.domain.game;

import com.avlindfors.montyhall.domain.api.Strategy;

public class Game {
  private Door[] doors;
  private Strategy strategy;

  private int carPositionIndex;
  private int[] goatPositionIndex;
  private int initialPickIndex;
}
