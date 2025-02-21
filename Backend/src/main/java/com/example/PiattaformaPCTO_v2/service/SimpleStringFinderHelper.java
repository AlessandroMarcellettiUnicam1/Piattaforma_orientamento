package com.example.PiattaformaPCTO_v2.service;

import com.example.PiattaformaPCTO_v2.collection.Scuola;
import net.ricecode.similarity.DiceCoefficientStrategy;
import net.ricecode.similarity.JaroWinklerStrategy;
import net.ricecode.similarity.SimilarityStrategy;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimpleStringFinderHelper implements StringFinderHelper{
    private final SimilarityStrategy jaroWinklerStrategy = new JaroWinklerStrategy();
    private final SimilarityStrategy diceCoefficientStrategy = new DiceCoefficientStrategy();

    /**
     * Trova la città più simile tra quelle nel database usando l'algoritmo Jaro-Winkler Distance.
     * @param inputCity città da cercare
     * @param allCities lista di città in cui cercare
     */
    public String findClosestCity(String inputCity, @NotNull List<String> allCities) {

        String bestMatch = null;
        double maxSimilarity = 0;

        for (String city : allCities) {
            double score = jaroWinklerStrategy.score(inputCity, city);
            if (score > maxSimilarity ) {
                maxSimilarity = score;
                bestMatch = city;
            }
        }

        return bestMatch;
    }

    /**
     * Trova la scuola più simile tra quelle presenti nella lista scuole usando l'algoritmo JDice-Sørensen coefficient.
     * @param inputNomeScuola nome della scuola da cercare
     * @param scuole lista di scuole in cui cercare
     */
    public Scuola findClosestScuola(String inputNomeScuola, @NotNull List<Scuola> scuole) {
        String bestMatch = null;
        double maxSimilarity = 0;
        Scuola bestScuola = null;

        for (Scuola scuola : scuole) {
            double score = diceCoefficientStrategy.score(inputNomeScuola, scuola.getNome());
            if (score > maxSimilarity) {
                maxSimilarity = score;
                bestMatch = scuola.getNome();
                bestScuola = scuola;
            }
        }

        return bestScuola;
    }

    @Override
    public String findMostSimilarString(String input, @NotNull List<String> strings) {
        String mostSimilarString = "";
        int minDistance = Integer.MAX_VALUE;
        for (String str : strings) {
            int distance = levenshteinDistance(input, str);
            if (distance < minDistance) {
                minDistance = distance;
                mostSimilarString = str;
            }
        }
        return mostSimilarString;
    }



    private  int levenshteinDistance(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
                }
            }
        }
        return dp[m][n];
    }
}
