package com.tp.keynoteserice.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;

@Entity @AllArgsConstructor @NoArgsConstructor @Builder @Setter @Getter
public class Keynote {
    @Id
    private UUID id;
    private String name;
    private String prenom;
    private String email;
    private String fonction;


}
