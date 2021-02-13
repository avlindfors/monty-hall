package com.avlindfors.montyhall.service;

import static com.avlindfors.montyhall.domain.api.Strategy.STICK;
import static com.avlindfors.montyhall.domain.game.Door.CAR;
import static com.avlindfors.montyhall.domain.game.Door.GOAT;

import com.avlindfors.montyhall.domain.api.Strategy;
import com.avlindfors.montyhall.domain.game.Door;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GameService {

  /**
   * Slumpar fram spelets initiala läge.
   * Läget består av 3 dörrar varav 1 dörr har en bil bakom sig.
   * @return spelets dörrar.
   */
  public Door[] initGame() {
    Door[] doors = new Door[3];
    Arrays.fill(doors, GOAT);
    int carStartPosition = generateRandomInt(0, 3);
    doors[carStartPosition] = CAR;
    return doors;
  }

  /**
   * Väljer en slumpmässig dörr.
   * @return index för vald dörr.
   */
  public int pickDoor(Door[] doors) {
    return generateRandomInt(0, doors.length);
  }

  /**
   * Spelledaren öppnar en av dörrarna som inte innehåller bilen.
   */
  public int openOneDoor(int initialDoorPick, Door[] doors) {
    ArrayList<Integer> potentialDoors = new ArrayList<>();
    for (int i = 0; i < doors.length; i++) {
      Door currentDoor = doors[i];
      if (initialDoorPick != i && currentDoor.equals(GOAT)) {
        potentialDoors.add(i);
      }
    }
    int randomDoorToOpen = generateRandomInt(0, potentialDoors.size());
    return potentialDoors.get(randomDoorToOpen);
  }

  /**
   * Deltagaren väljer att stanna eller byta dörr och avgör därmed spelets resultat.
   */
  public boolean endGame(int initialDoorPick, int openedDoor, Door[] doors, Strategy strategy) {
    if (strategy.equals(STICK)) {
      return doors[initialDoorPick].equals(CAR);
    }

    int finalDoorChoice = 0;
    for (int i = 0; i < doors.length;i++) {
      if (i != initialDoorPick && i != openedDoor) {
        finalDoorChoice = i;
      }
    }
    return doors[finalDoorChoice].equals(CAR);
  }

  private int generateRandomInt(int start, int end) {
    return ThreadLocalRandom.current().nextInt(start, end);
  }
}
