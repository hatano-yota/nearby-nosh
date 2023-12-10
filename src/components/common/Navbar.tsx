import { HiMenu, HiOutlineLocationMarker } from 'react-icons/hi';

type Props = {
  lat: number;
  lng: number;
  range: number;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Navbar = (props: Props): JSX.Element => {
  const { lat, lng, range, handleRangeChange } = props;

  return (
    <div className="navbar bg-base-300">
      <button className="btn btn-square border-transparent bg-transparent shadow-none">
        <HiMenu size={20} />
      </button>

      <div className="flex-1">
        <a href="" className="btn btn-ghost border-transparent bg-transparent text-xl shadow-none">
          <span className="font-normal">NEARBY</span>
          <span className="font-bold">NOSH</span>
        </a>
      </div>

      <div className="dropdown dropdown-end mr-4">
        <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
          <HiOutlineLocationMarker size={20} />
        </div>
        <div
          tabIndex={0}
          className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">現在地</span>
            <span className="text-info">緯度: {lat}</span>
            <span className="text-info">経度: {lng}</span>
            <div className="card-actions">
              {/* TODO: Map or Google Mapへのリンクを表示する */}
              <button className="btn btn-primary btn-block">Map</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mr-8">
        <select value={range} onChange={handleRangeChange} className="select w-full max-w-xs">
          <option value={1}>300m</option>
          <option value={2}>500m</option>
          <option value={3}>1000m</option>
          <option value={4}>2000m</option>
          <option value={5}>3000m</option>
        </select>
      </div>

      <div className="form-control mr-8">
        <input type="text" placeholder="Search" className="input input-bordered w-96" />
      </div>
    </div>
  );
};

export default Navbar;
