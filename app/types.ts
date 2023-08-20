export type Data = {
  links:              NavLinks;
  element_count:      number;
  near_earth_objects: NearEarthObjects;
}

export type NavLinks = {
  next: string;
  prev: string;
  self: string;
}

export type NearEarthObjects = {
  [key: string]: Asteroid[];
}

export type Asteroid = {
  links:                             Asteroid_Links;
  id:                                string;
  neo_reference_id:                  string;
  name:                              string;
  nasa_jpl_url:                      string;
  absolute_magnitude_h:              number;
  estimated_diameter:                EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data:               CloseApproachDatum[];
  is_sentry_object:                  boolean;
  ordered?: boolean;
}

export type CloseApproachDatum = {
  close_approach_date:       string;
  close_approach_date_full:  string;
  epoch_date_close_approach: number;
  relative_velocity:         RelativeVelocity;
  miss_distance:             MissDistance;
  orbiting_body:             string;
}

export type MissDistance = {
  astronomical: string;
  lunar:        string;
  kilometers:   string;
  miles:        string;
}

export type Unit = 'kilometers' | 'lunar'

export type RelativeVelocity = {
  kilometers_per_second: string;
  kilometers_per_hour:   string;
  miles_per_hour:        string;
}

export type EstimatedDiameter = {
  kilometers: Feet;
  meters:     Feet;
  miles:      Feet;
  feet:       Feet;
}

export type Feet = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export type Asteroid_Links = {
  self: string;
}


export type Store = {
  orderedAsts: Asteroid[]
  unit: Unit
}