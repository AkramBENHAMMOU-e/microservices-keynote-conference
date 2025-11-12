package com.tp.keynoteserice.web;

import com.tp.keynoteserice.entities.Keynote;
import com.tp.keynoteserice.repository.KeynoteRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.List;
import java.util.UUID;

@RestController
public class KeynoteController {
    private KeynoteRepository keynoteRepository;
    public KeynoteController(KeynoteRepository keynoteRepository) {
        this.keynoteRepository = keynoteRepository;
    }

    @GetMapping("/keynotes")
    public List<Keynote> getAllKeynotes(){
        return keynoteRepository.findAll();

    }

    @PostMapping("/keynotes")
    public Keynote addKeynote(@RequestBody Keynote keynote){
        if(keynote.getId() == null){
            keynote.setId(UUID.randomUUID());
        }
        return keynoteRepository.save(keynote);
    }

    @GetMapping("/keynotes/{id}")
    public Keynote getKeynoteById(@PathVariable UUID id){
        return keynoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Keynote not found with id " + id));
    }

}
