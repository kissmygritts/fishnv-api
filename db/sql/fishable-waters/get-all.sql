SELECT
  fw.id,
  fw.water_name,
  fw.label,
  fw.region,
  fw.county,
  species.species,
  json_build_array(
    st_Y(st_PointOnSurface(fw.geom)),
    st_X(st_PointOnSurface(fw.geom))
  ) AS coordinates
FROM fishable_waters AS fw
  JOIN (
    SELECT
      species_water_joiner.water_id,
      jsonb_agg(species.species) AS species
    FROM species
      JOIN species_water_joiner ON species.id = species_water_joiner.species_id
    GROUP BY species_water_joiner.water_id
  ) AS species ON fw.id = species.water_id
$<where:raw>
ORDER BY water_name
