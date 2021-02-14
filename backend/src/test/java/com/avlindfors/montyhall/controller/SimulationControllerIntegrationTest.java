package com.avlindfors.montyhall.controller;

import static com.avlindfors.montyhall.domain.api.Strategy.STICK;
import static com.avlindfors.montyhall.domain.api.Strategy.SWAP;
import static com.avlindfors.montyhall.util.SimulationTestUtil.createRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.montyhall.MontyHallApplication;
import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest(classes = MontyHallApplication.class)
@AutoConfigureMockMvc
public class SimulationControllerIntegrationTest {

  private static final String URL = "/api/v1/simulate";

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void canMakeRequestedNumberOfSimulationsWithSwap() throws Exception {
    var request = createRequest(10, SWAP);
    var response = makeCall(request);

    assertThat(response.getTotalSimulations()).isEqualTo(10);
    assertThat(response.getTotalWins()).isBetween(0, 10);
  }

  @Test
  public void canMakeRequestedNumberOfSimulationsWithStick() throws Exception {
    var request = createRequest(10, STICK);
    var response = makeCall(request);

    assertThat(response.getTotalSimulations()).isEqualTo(10);
    assertThat(response.getTotalWins()).isBetween(0, 10);
  }

  private SimulationResponse makeCall(SimulationRequest request)
      throws Exception {
    return performCall(request, HttpStatus.OK, SimulationResponse.class);
  }

  private <R> R performCall(SimulationRequest request, HttpStatus status, Class<R> returnType)
      throws Exception {
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().is(status.value()))
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(), returnType);
  }
}
