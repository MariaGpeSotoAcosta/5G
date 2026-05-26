package com.smartcoverage.service;

import com.smartcoverage.dto.TowerFilterInput;
import com.smartcoverage.model.Tower;
import com.smartcoverage.repository.TowerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TowerService {

    private static final Logger log = LoggerFactory.getLogger(TowerService.class);

    private final TowerRepository repository;

    public TowerService(TowerRepository repository) {
        this.repository = repository;
    }

    public List<Tower> getTowers(TowerFilterInput filter) {
        log.info("Fetching towers with filter: {}", filter);
        List<Tower> towers = repository.findAll(filter);
        log.info("Found {} towers", towers.size());
        return towers;
    }
}
