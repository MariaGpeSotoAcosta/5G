package com.smartcoverage.service;

import com.smartcoverage.dto.CoverageFilterInput;
import com.smartcoverage.model.CoverageZone;
import com.smartcoverage.repository.CoverageZoneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoverageZoneService {

    private static final Logger log = LoggerFactory.getLogger(CoverageZoneService.class);

    private final CoverageZoneRepository repository;

    public CoverageZoneService(CoverageZoneRepository repository) {
        this.repository = repository;
    }

    public List<CoverageZone> getCoverageZones(CoverageFilterInput filter) {
        log.info("Fetching coverage zones with filter: {}", filter);
        List<CoverageZone> zones = repository.findAll(filter);
        log.info("Found {} coverage zones", zones.size());
        return zones;
    }
}
