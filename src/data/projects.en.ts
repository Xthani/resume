export const projects = [
    {
        title: 'Safe City Sakhalin',
        description: 'Emergency monitoring system for Sakhalin: maps, resources, response, access matrix.',
        tech: ['React', 'TypeScript', 'Redux', 'OpenLayers', 'Ant Design'],
        role: 'Support, refactoring, module development',
        period: 'October 2021 – March 2023',
        image: '/project-visualization-1.svg',
        details:
            'Development and support of a government emergency response system. The project included a map displaying infrastructure objects and incidents in real-time, role-based access management, resource registry, reports and response management dashboard. Used OpenLayers for map operations, Ant Design and Styled Components for UI. Performed refactoring of legacy code, implemented new modules for equipment and personnel accounting.',
    },
    {
        title: 'EVRAZ Prom-Ecosystem',
        description: 'Platform for managing metallurgical and mining processes: analytics, planning, maps.',
        tech: ['React', 'TypeScript', 'Redux Toolkit', 'Leaflet', 'SCSS'],
        role: 'Frontend module development',
        period: 'May 2023 – February 2024',
        image: '/project-visualization.svg',
        details:
            'Worked on an internal platform for automation and analytics of production processes at EVRAZ company. Participated in the development of mining and enrichment modules, route visualization on the map (Leaflet), shift planning system and work with production reports. Interacted with analysts and backend developers, implemented adaptive interfaces, participated in performance optimization and unit test implementation. Used REST API and CI/CD through Azure DevOps.',
    },
    {
        title: 'CASSA Office',
        description: 'ERP system for restaurant business: 50+ modules, finance, delivery, analytics.',
        tech: ['React', 'TypeScript', 'Redux Toolkit', 'PrimeReact', 'Chart.js'],
        role: 'Complete frontend development',
        period: 'May 2024 – April 2025',
        image: '/cassa-office-illustration.svg',
        details:
            'Developed from scratch a large ERP system for restaurant chain management: order processing, financial accounting, delivery management, logistics, warehouse and analytics. Used Feature-Sliced Design (FSD) architecture, PrimeReact components, custom maps (Leaflet) and charts (Chart.js). Implemented more than 50 separate modules, API interaction, multi-authorization and access control. Worked on loading optimization, UX improvement, dark theme implementation and notification system. Maintained the project for a year.',
    },
] 