package com.avlindfors.montyhall.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.avlindfors.montyhall.service.SimulationService;

@RestController
@RequestMapping("/api/v1")
public class SimulationController {

  private final SimulationService service;

  @Autowired
  public SimulationController(SimulationService service) {
    this.service = service;
  }

  @PostMapping(value = "/simulate",
      produces = APPLICATION_JSON_VALUE,
      consumes = APPLICATION_JSON_VALUE)
  public SimulationResponse simulate(@RequestBody SimulationRequest request) {
    return service.simulate(request);
  }

  @GetMapping(value = "/test")
  public String test() {
    return "HEJ, VÄRLDEN";
  }
}
