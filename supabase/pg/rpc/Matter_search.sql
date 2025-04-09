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
  WHERE 
    -- ✅ **Always search case name**
    (m.name ILIKE search_term || '%')

    -- ✅ **Expand search instead of restricting results**
    OR (include_case AND m.name ILIKE search_term || '%') -- Case name should always be included
    OR (include_client AND m.client IS NOT NULL AND m.client ILIKE search_term || '%')
    OR (include_attorney AND attorney.user_id IS NOT NULL AND attorney.user_name ILIKE search_term || '%')
    OR (include_opposing AND m.opposing_council IS NOT NULL AND m.opposing_council->>'name' ILIKE search_term || '%')
    OR (include_court AND m.court IS NOT NULL AND m.court->>'name' ILIKE search_term || '%')

  ORDER BY m.name;
END;
$$ LANGUAGE plpgsql;
