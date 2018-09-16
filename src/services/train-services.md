# API RESSOURCES (sans credentials)
- Doc API: https://ressources.data.sncf.com/api/v1/documentation
- Ressources: https://ressources.data.sncf.com/explore/?sort=modified

## Gares

- Tableau : https://ressources.data.sncf.com/explore/dataset/sncf-gares-et-arrets-transilien-ile-de-france/table/?sort=libelle
- API : https://ressources.data.sncf.com/explore/dataset/sncf-gares-et-arrets-transilien-ile-de-france/api/


### Recherche full text gare
- https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-gares-et-arrets-transilien-ile-de-france&q=nom_gare%3DVal&lang=fr&rows=2&sort=code_uic&facet=code_uic&facet=nom_gare
- https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-gares-et-arrets-transilien-ile-de-france&q=nom_gare%3DPontault&lang=fr&rows=2&sort=code_uic&facet=code_uic&facet=nom_gare


### Recherche précise gare
- Pontault-Combault
https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-gares-et-arrets-transilien-ile-de-france&lang=fr&rows=2&sort=code_uic&facet=code_uic&facet=nom_gare&refine.nom_gare=%C3%89merainville%20-%20Pontault-Combault

- Val de Fontenay
https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-gares-et-arrets-transilien-ile-de-france&lang=fr&rows=2&sort=code_uic&facet=code_uic&facet=nom_gare&refine.nom_gare=Val+de+Fontenay

### Recheche par position GPS
- A deux kms de chez moi (Ma pos Latitude: 48.8014582  Longitude: 2.5993365)
https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-gares-et-arrets-transilien-ile-de-france&lang=fr&rows=2&sort=code_uic&facet=code_uic&facet=nom_gare&geofilter.distance=48.8014582,2.5993365,2000



# API SNCF
- FAQ: https://www.digital.sncf.com/faq/api
- API: https://api.sncf.com/v1/
- Key: xxx (see https://www.digital.sncf.com/startup/api/token-developpeur)
## Horaires

- Départs :  https://xxx@api.sncf.com/v1/coverage/sncf/stop_areas/stop_area:OCE:SA:87116046/departures?datetime=20180914T184035  
-> object.departures[1].stop_date_time

## Autres

- Coord => pas le droit 
https://xxx@api.sncf.com/v1/coord/2.59861;48.80048/

- Itinéraires => pas essayé
https://xxx@api.sncf.com/v1/coverage/sncf/journeys?from=&to=&datetime=20180914T200135

## Code
```
    if ($_ == 401) { die "Authentication failed or missing (invalid API key?)\n"; }
    elsif ($_ == 403) {
        if (defined $response->header('Retry-After')) {
            my $retry_after = $response->header('Retry-After');
            die "API call quota exceeded (retry after $retry_after s)\n";
        }
        else {
            die "Forbidden (invalid station or other error)\n";
        }
    }
    elsif ($_ == 404) { die "Invalid path supplied to API call\n"; }
    elsif ($_ == 406) { die "Unsupported version\n"; }
    elsif ($_ == 500) { die "API is broken\n"; }
    elsif ($_ == 503) { die "API is overloaded\n"; }
```