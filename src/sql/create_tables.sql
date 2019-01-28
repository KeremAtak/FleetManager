CREATE TABLE public.models( 
    id SERIAL,
    brand character(255) NOT NULL, 
    model character(255) NOT NULL, 
    model_year integer NOT NULL, 
    engine_displacement integer, 
    engine_power integer NOT NULL, 
    CONSTRAINT models_pkey 
    PRIMARY KEY (id)
);

CREATE TABLE public.vehicles(
    id SERIAL, 
    registration_number character(7), 
    inspection_date date, 
    model_id integer, 
    CONSTRAINT vehicles_pkey 
    PRIMARY KEY(id), 
    CONSTRAINT vehicles_model_id_fkey 
    FOREIGN KEY (model_id) 
    REFERENCES public.models(id) MATCH SIMPLE 
    ON UPDATE CASCADE ON DELETE CASCADE
);
