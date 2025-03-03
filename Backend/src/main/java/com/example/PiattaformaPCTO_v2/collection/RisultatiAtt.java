package com.example.PiattaformaPCTO_v2.collection;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Data
@Document(collection = "RisultatiAtt")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RisultatiAtt {

    @Id
    private String id;

    private String attivita;

    private String tipo;

    private int annoAcc;

    private List<Universitario> universitarii;

    public RisultatiAtt() {
        this.universitarii = new ArrayList<>(10000);
    }



    public void addUniversitari(Universitario universitario) {
        this.universitarii.add(universitario);
    }

    public void addUniversitari(List<Universitario> univ){this.universitarii.addAll(univ);}

    public String getAttivita() {
        return attivita;
    }

    public int getAnnoAcc() {
        return annoAcc;
    }

    public List<Universitario> getUniversitarii() {
        return universitarii;
    }

    public void setUniversitarii(List<Universitario> universitarii) {
        this.universitarii = universitarii;
    }

    public void setAttivita(String attivita) {
        this.attivita = attivita;
    }

    public void setAnnoAcc(int annoAcc) {
        this.annoAcc = annoAcc;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
