package com.avlindfors.montyhall.domain.game;

import static com.avlindfors.montyhall.domain.game.Prize.CAR;

import com.avlindfors.montyhall.domain.api.Strategy;

import java.util.Arrays;

/**
 * Holds entire game state. Useful if we want to step through an instance of the game.
 */
public class Game {
  private final Strategy strategy;
  private Prize[] doors;
  private Integer carPositionIndex;
  private int[] goatPositionIndices;
  private Integer initialPickIndex;
  private Integer openDoorIndex;
  private Result gameResult;

  public Game(Strategy strategy) {
    this.strategy = strategy;
  }

  public Prize[] getDoors() {
    return doors;
  }

  public void setDoors(Prize[] doors) {
    this.doors = doors;
  }

  public Strategy getStrategy() {
    return strategy;
  }

  public Integer getCarPositionIndex() {
    return carPositionIndex;
  }

  public void setCarPositionIndex(Integer carPositionIndex) {
    this.carPositionIndex = carPositionIndex;
  }

  public int[] getGoatPositionIndices() {
    return goatPositionIndices;
  }

  public void setGoatPositionIndices(int[] goatPositionIndices) {
    this.goatPositionIndices = goatPositionIndices;
  }

  public Integer getInitialPickIndex() {
    return initialPickIndex;
  }

  public void setInitialPickIndex(Integer initialPickIndex) {
    this.initialPickIndex = initialPickIndex;
  }

  public Result getGameResult() {
    return gameResult;
  }

  public void setGameResult(Result gameResult) {
    this.gameResult = gameResult;
  }

  public int getOpenDoorIndex() {
    return openDoorIndex;
  }

  public void setOpenDoorIndex(Integer openDoorIndex) {
    this.openDoorIndex = openDoorIndex;
  }

  /**
   * Determines if current pick is a winning condition.
   */
  public boolean isCurrentPickCorrect() {
    return doors[initialPickIndex].equals(CAR);
  }

  @Override
  public String toString() {
    return "Game{"
        + "strategy=" + strategy
        + ", doors=" + Arrays.toString(doors)
        + ", carPositionIndex=" + carPositionIndex
        + ", goatPositionIndex=" + Arrays.toString(goatPositionIndices)
        + ", initialPickIndex=" + initialPickIndex
        + ", openDoorIndex=" + openDoorIndex
        + ", gameResult=" + gameResult
        + '}';
  }
}
