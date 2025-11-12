package com.tp.conferenceservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity @Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String texte;
    private Date date;
    private int  note;
    @ManyToOne
    private Conference conference;

    public void setNote(int note) {
        if(this.note < 0 || this.note > 5){
            throw new IllegalArgumentException("Note must be between 0 and 5");
        }
        this.note = note;
    }
}
