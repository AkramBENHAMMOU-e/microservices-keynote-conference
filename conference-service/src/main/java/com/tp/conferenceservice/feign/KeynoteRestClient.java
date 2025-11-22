package com.tp.conferenceservice.feign;

import com.tp.conferenceservice.model.Keynote;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "Keynote-service")
public interface KeynoteRestClient {
    @GetMapping("/keynotes")
    List<Keynote> getAllKeynotes();
}
