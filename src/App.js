import { useMemo, useState } from 'react';

const movies = [
  {
    id: 'aurora',
    title: '오로라 시티',
    genre: 'SF 드라마',
    rating: '12세',
    runtime: '124분',
    poster:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80',
    summary: '빛으로 잠들지 않는 미래 도시에서 사라진 기억을 찾는 이야기',
    times: ['10:20', '13:40', '17:10', '20:30'],
  },
  {
    id: 'garden',
    title: '초여름 정원',
    genre: '로맨스',
    rating: '전체',
    runtime: '108분',
    poster:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
    summary: '낡은 야외극장을 되살리며 서로의 계절을 알아가는 두 사람',
    times: ['09:50', '12:30', '15:20', '19:00'],
  },
  {
    id: 'signal',
    title: '마지막 신호',
    genre: '스릴러',
    rating: '15세',
    runtime: '116분',
    poster:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80',
    summary: '끊긴 통신망 너머에서 도착한 단 하나의 구조 요청',
    times: ['11:10', '14:20', '18:00', '21:40'],
  },
];

const seats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];
const occupiedSeats = ['A3', 'B2', 'C4'];
const price = 13000;

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0].id);
  const [selectedTime, setSelectedTime] = useState(movies[0].times[0]);
  const [selectedSeats, setSelectedSeats] = useState(['B3']);

  const selectedMovie = useMemo(
    () => movies.find((movie) => movie.id === selectedMovieId),
    [selectedMovieId]
  );

  const totalPrice = selectedSeats.length * price;

  const selectMovie = (movie) => {
    setSelectedMovieId(movie.id);
    setSelectedTime(movie.times[0]);
    setSelectedSeats([]);
  };

  const toggleSeat = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    setSelectedSeats((currentSeats) =>
      currentSeats.includes(seat)
        ? currentSeats.filter((selectedSeat) => selectedSeat !== seat)
        : [...currentSeats, seat]
    );
  };

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero__copy">
          <p className="eyebrow">Cinema Booking</p>
          <h1 id="page-title">오늘 볼 영화를 고르고 바로 예매하세요.</h1>
          <p>
            상영작, 시간, 좌석을 한 화면에서 선택하는 간단한 영화 예매 시스템입니다.
          </p>
        </div>
        <div className="hero__poster" aria-label={`${selectedMovie.title} 포스터`}>
          <img src={selectedMovie.poster} alt="" />
        </div>
      </section>

      <section className="booking-grid" aria-label="영화 예매">
        <div className="movie-list">
          <div className="section-heading">
            <p className="eyebrow">Now Showing</p>
            <h2>상영 영화</h2>
          </div>
          <div className="movie-list__items">
            {movies.map((movie) => (
              <button
                className={`movie-card ${selectedMovieId === movie.id ? 'is-active' : ''}`}
                key={movie.id}
                onClick={() => selectMovie(movie)}
                type="button"
              >
                <img src={movie.poster} alt="" />
                <span>
                  <strong>{movie.title}</strong>
                  <small>
                    {movie.genre} · {movie.rating} · {movie.runtime}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="booking-panel">
          <div className="section-heading">
            <p className="eyebrow">Selected</p>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.summary}</p>
          </div>

          <div className="control-group">
            <h3>상영 시간</h3>
            <div className="time-options" role="group" aria-label="상영 시간 선택">
              {selectedMovie.times.map((time) => (
                <button
                  className={selectedTime === time ? 'is-active' : ''}
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  type="button"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="seat-heading">
              <h3>좌석 선택</h3>
              <span>{selectedSeats.length}석 선택됨</span>
            </div>
            <div className="screen">SCREEN</div>
            <div className="seat-map" aria-label="좌석 선택">
              {seats.map((seat) => {
                const isOccupied = occupiedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`seat ${isSelected ? 'is-selected' : ''}`}
                    disabled={isOccupied}
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    type="button"
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
            <div className="seat-legend" aria-label="좌석 상태">
              <span><i className="available" />선택 가능</span>
              <span><i className="selected" />선택됨</span>
              <span><i className="occupied" />예매 완료</span>
            </div>
          </div>
        </div>

        <aside className="summary-panel" aria-label="예매 요약">
          <h2>예매 요약</h2>
          <dl>
            <div>
              <dt>영화</dt>
              <dd>{selectedMovie.title}</dd>
            </div>
            <div>
              <dt>시간</dt>
              <dd>{selectedTime}</dd>
            </div>
            <div>
              <dt>좌석</dt>
              <dd>{selectedSeats.length > 0 ? selectedSeats.join(', ') : '선택 전'}</dd>
            </div>
            <div>
              <dt>결제 금액</dt>
              <dd>{totalPrice.toLocaleString('ko-KR')}원</dd>
            </div>
          </dl>
          <button className="primary-action" disabled={selectedSeats.length === 0} type="button">
            예매하기
          </button>
        </aside>
      </section>
    </main>
  );
}

export default App;
