package com.example.PiattaformaPCTO_v2.Request;

public class UploadDefinitively {
    private String nome;
    private int anno;


    public UploadDefinitively(String nome, int anno) {
        this.nome = nome;
        this.anno = anno;
    }
    public UploadDefinitively() {

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getAnno() {
        return anno;
    }

    public void setAnno(int anno) {
        this.anno = anno;
    }
}
