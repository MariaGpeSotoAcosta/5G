package com.smartcoverage.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.smartcoverage.dto.TowerFilterInput;
import com.smartcoverage.model.Tower;
import com.smartcoverage.model.enums.TowerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class TowerRepository {

    private static final Logger log = LoggerFactory.getLogger(TowerRepository.class);
    private static final String COLLECTION = "towers";

    private final Firestore firestore;

    public TowerRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<Tower> findAll(TowerFilterInput filter) {
        try {
            Query query = firestore.collection(COLLECTION);

            if (filter != null) {
                if (filter.provider() != null && !filter.provider().isBlank()) {
                    query = query.whereEqualTo("provider", filter.provider());
                }
                if (filter.status() != null && !filter.status().isBlank()) {
                    query = query.whereEqualTo("status", filter.status());
                }
            }

            QuerySnapshot snapshot = query.get().get();
            return snapshot.getDocuments().stream()
                    .map(this::toModel)
                    .toList();
        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching towers from Firestore", e);
            Thread.currentThread().interrupt();
            return List.of();
        }
    }

    private Tower toModel(DocumentSnapshot doc) {
        return Tower.builder()
                .id(doc.getId())
                .provider(doc.getString("provider"))
                .height(doc.getDouble("height"))
                .latitude(doc.getDouble("latitude"))
                .longitude(doc.getDouble("longitude"))
                .status(parseEnum(doc.getString("status"), TowerStatus.class))
                .build();
    }

    private <T extends Enum<T>> T parseEnum(String value, Class<T> enumClass) {
        if (value == null) return null;
        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("Unknown enum value '{}' for {}", value, enumClass.getSimpleName());
            return null;
        }
    }
}
