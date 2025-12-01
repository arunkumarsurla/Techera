import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://apis.ccbp.in/te/courses");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCourses(data.courses || []);
      } catch {
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">
          <h1 style={{fontSize:"3rem"}}>Course Studio</h1>
        </div>
      </header>

      <section className="hero">
        <h2>Discover bite-sized, career-ready courses</h2>

        <div className="search-row">
          <input
            type="search"
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>{filtered.length} results</span>
        </div>
      </section>

      <section className="content">
        {loading && <p>Loading…</p>}

        {error && (
          <div>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p>No courses found for “{search}”.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid">
            {filtered.map((course) => (
              <Link
                to={`/course-details/${course.id}`}
                key={course.id}
                className="card-link"
              >
                <article className="card">
                  <img src={course.logo_url} alt={course.name} />
                  <h3>{course.name}</h3>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Course Studio</small>
      </footer>
    </main>
  );
};

export default Courses;
