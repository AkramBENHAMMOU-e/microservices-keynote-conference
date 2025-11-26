package com.tp.conferenceservice.feign;

import com.tp.conferenceservice.model.Keynote;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "Keynote-service")
public interface KeynoteRestClient {
    @GetMapping("/keynotes")
    List<Keynote> getAllKeynotes();

    @GetMapping("/keynotes/{id}")
    Keynote getKeynoteById(@PathVariable UUID id);
}
