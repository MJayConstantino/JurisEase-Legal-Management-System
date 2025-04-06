CREATE OR REPLACE FUNCTION search_matters(
  search_term text,
  include_attorney boolean DEFAULT false,
  include_client boolean DEFAULT false,
  include_case boolean DEFAULT false,
  include_opposing boolean DEFAULT false,
  include_court boolean DEFAULT false
) RETURNS SETOF matters AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT m.*
  FROM matters m
  LEFT JOIN users attorney ON m.assigned_attorney = attorney.user_id
  WHERE (
    -- Default case: search only name when no attributes or only caseName is selected
    (NOT include_attorney AND NOT include_client AND NOT include_opposing AND NOT include_court)
    AND (m.name ILIKE '%' || search_term || '%')
    
    OR
    
    -- Attorney search (with not null check)
    (include_attorney AND attorney.user_id IS NOT NULL AND attorney.user_name ILIKE '%' || search_term || '%')
    
    OR
    
    -- Client search
    (include_client AND m.client ILIKE '%' || search_term || '%')
    
    OR
    
    -- Opposing council search
    (include_opposing AND m.opposing_council->>'name' ILIKE '%' || search_term || '%')
    
    OR
    
    -- Court search
    (include_court AND m.court->>'name' ILIKE '%' || search_term || '%')
  )
  ORDER BY m.name;
END;
$$ LANGUAGE plpgsql;