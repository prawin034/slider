import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import data from './components/data';

function App() {
  const [people] = useState(data);
  const [index, setindex] = useState(0);

  useEffect(() => {
    const lastindex = people.length - 1;

    if (index < 0) {
      setindex(lastindex);
    }
    if (index > lastindex) {
      setindex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setindex(index + 1);
    }, 3000);

    return () => clearInterval(slider);
  }, [index]);
  return (
    <main>
      <section className="section">
        <div className="section_title">
          <h2>
            <span>/</span>SLIDER
          </h2>
        </div>
        <div className="section_info">
          {people.map((person, personindex) => {
            const { id, image, name, title, quote } = person;
            //CONDITIONS TO APPLY LATER FOR SLIDER FUNCTIONALITY

            let position = 'section_article_nextslide';

            if (personindex === index) {
              position = 'section_article_activeslide';
            }
            if (
              personindex === index - 1 ||
              (index === 0 && personindex === people.length - 1)
            ) {
              position = 'section_article_lastslide';
            }
            return (
              <article key={id} className={`section_article ${position}`}>
                <div className="section_article_imgbox">
                  <img
                    src={image}
                    alt={title}
                    className="section_article_img"
                  />
                  <h2 className="section_article_name">{name}</h2>
                  <p className="section_article_title">{title}</p>
                  <p className="section_article_quote">{quote}</p>
                  <FaQuoteRight size={20} color="#1098ad" />
                </div>
              </article>
            );
          })}
          <div className="section_info_btn">
            <div className="flex">
              <button
                onClick={() => setindex(index - 1)}
                className="section_info_btn_left"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => setindex(index + 1)}
                className="section_info_btn_right"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
