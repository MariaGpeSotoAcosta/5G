package com.smartcoverage.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.smartcoverage.dto.CoverageFilterInput;
import com.smartcoverage.model.CoverageZone;
import com.smartcoverage.model.enums.ZoneStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class CoverageZoneRepository {

    private static final Logger log = LoggerFactory.getLogger(CoverageZoneRepository.class);
    private static final String COLLECTION = "coverageZones";

    private final Firestore firestore;

    public CoverageZoneRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<CoverageZone> findAll(CoverageFilterInput filter) {
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
            List<CoverageZone> zones = snapshot.getDocuments().stream()
                    .map(this::toModel)
                    .toList();

            // Apply minSignalStrength filter in memory (Firestore compound queries require composite index)
            if (filter != null && filter.minSignalStrength() != null) {
                int min = filter.minSignalStrength();
                zones = zones.stream()
                        .filter(z -> z.getSignalStrength() != null && z.getSignalStrength() >= min)
                        .toList();
            }

            return zones;
        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching coverage zones from Firestore", e);
            Thread.currentThread().interrupt();
            return List.of();
        }
    }

    private CoverageZone toModel(DocumentSnapshot doc) {
        return CoverageZone.builder()
                .id(doc.getId())
                .zoneName(doc.getString("zoneName"))
                .signalStrength(doc.getLong("signalStrength") != null
                        ? doc.getLong("signalStrength").intValue() : null)
                .provider(doc.getString("provider"))
                .latitude(doc.getDouble("latitude"))
                .longitude(doc.getDouble("longitude"))
                .status(parseEnum(doc.getString("status"), ZoneStatus.class))
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
