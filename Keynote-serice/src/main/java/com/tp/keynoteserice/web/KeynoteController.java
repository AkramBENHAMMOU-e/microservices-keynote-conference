package com.tp.keynoteserice.web;

import com.tp.keynoteserice.entities.Keynote;
import com.tp.keynoteserice.repository.KeynoteRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
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

    @PutMapping("/keynotes/{id}")
    public Keynote updateKeynote(@PathVariable UUID id, @RequestBody Keynote keynote){
        Keynote k = keynoteRepository.findById(id).get();
        k.setName(keynote.getName());
        k.setPrenom(keynote.getPrenom());
        k.setEmail(keynote.getEmail());
        k.setFonction(keynote.getFonction());
        return keynoteRepository.save(k);
    }

    @DeleteMapping("/keynotes/{id}")
    public void deleteKeynote(@PathVariable UUID id){
        keynoteRepository.deleteById(id);
    }


}
