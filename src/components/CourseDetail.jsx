import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://apis.ccbp.in/te/courses/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setDetail(data.course_details);
      } catch {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <div className="loader" />;

  if (error || !detail)
    return (
      <div className="page">
        <p>{error || "Course not available."}</p>
        <button className="btn" onClick={() => nav(-1)}>Back</button>
        <Link to="/" className="btn ghost">All Courses</Link>
      </div>
    );

  return (
    <main className="page detail-page">
      <button className="btn ghost" onClick={() => nav(-1)}>← Back</button>
      <h1 className="detail-title">{detail.name}</h1>

      <div className="detail-grid">
        <img
          src={detail.image_url}
          alt={detail.name}
          className="detail-img"
        />

        <div>
          <p>{detail.description}</p>

          <div className="detail-actions">
            <button
              className="btn primary"
              onClick={() => alert("Enroll flow not implemented.")}
            >
              Enroll now
            </button>

            <a
              href={detail.course_url}
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              View on provider
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;
