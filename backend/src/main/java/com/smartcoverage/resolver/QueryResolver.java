package com.smartcoverage.resolver;

import com.smartcoverage.dto.CoverageFilterInput;
import com.smartcoverage.dto.IncidentFilterInput;
import com.smartcoverage.dto.TowerFilterInput;
import com.smartcoverage.model.CoverageZone;
import com.smartcoverage.model.Incident;
import com.smartcoverage.model.Tower;
import com.smartcoverage.service.CoverageZoneService;
import com.smartcoverage.service.IncidentService;
import com.smartcoverage.service.TowerService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class QueryResolver {

    private final CoverageZoneService coverageZoneService;
    private final TowerService towerService;
    private final IncidentService incidentService;

    public QueryResolver(CoverageZoneService coverageZoneService,
                         TowerService towerService,
                         IncidentService incidentService) {
        this.coverageZoneService = coverageZoneService;
        this.towerService = towerService;
        this.incidentService = incidentService;
    }

    @QueryMapping
    public List<CoverageZone> coverageZones(@Argument CoverageFilterInput filter) {
        return coverageZoneService.getCoverageZones(filter);
    }

    @QueryMapping
    public List<Tower> towers(@Argument TowerFilterInput filter) {
        return towerService.getTowers(filter);
    }

    @QueryMapping
    public List<Incident> incidents(@Argument IncidentFilterInput filter) {
        return incidentService.getIncidents(filter);
    }
}
