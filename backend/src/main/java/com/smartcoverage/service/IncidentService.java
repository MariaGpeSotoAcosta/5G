package com.smartcoverage.service;

import com.smartcoverage.dto.IncidentFilterInput;
import com.smartcoverage.model.Incident;
import com.smartcoverage.repository.IncidentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {

    private static final Logger log = LoggerFactory.getLogger(IncidentService.class);

    private final IncidentRepository repository;

    public IncidentService(IncidentRepository repository) {
        this.repository = repository;
    }

    public List<Incident> getIncidents(IncidentFilterInput filter) {
        log.info("Fetching incidents with filter: {}", filter);
        List<Incident> incidents = repository.findAll(filter);
        log.info("Found {} incidents", incidents.size());
        return incidents;
    }
}
