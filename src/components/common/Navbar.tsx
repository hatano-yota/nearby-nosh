import { HiMenu, HiOutlineLocationMarker } from 'react-icons/hi';

import CommonMap from '@/components/common/CommonMap';
import { useNavbar } from '@/hooks/common/useNavbar';

const Navbar = (): JSX.Element => {
  const {
    inputText,
    range,
    location,
    handleChangeInput,
    onPressEnterKey,
    handleRangeChange,
    onClickHomeButton,
  } = useNavbar();

  return (
    <div className="navbar bg-[#ffeed6]">
      <button className="btn btn-square border-transparent bg-transparent shadow-none">
        <HiMenu size={20} />
      </button>

      <div className="flex-1">
        <button
          onClick={onClickHomeButton}
          className="btn btn-ghost border-transparent bg-transparent text-xl shadow-none"
        >
          <span className="text-h2">NEARBY</span>
          <span className="text-h2 font-bold">NOSH</span>
        </button>
      </div>

      <div className="dropdown dropdown-end mr-4">
        <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
          <HiOutlineLocationMarker size={20} />
        </div>
        <div
          tabIndex={0}
          className="card dropdown-content card-compact z-[1] mt-3 w-96 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">現在地</span>
            <span className="text-info">緯度: {location.lat}</span>
            <span className="text-info">経度: {location.lng}</span>
            <div className="card-actions">
              <CommonMap className="h-80 w-96 rounded" position={location} />
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
        <input
          type="text"
          value={inputText}
          onChange={(e) => handleChangeInput(e)}
          onKeyDown={(e) => onPressEnterKey(e)}
          placeholder="店名やジャンルを指定する "
          className="input input-bordered w-96"
        />
      </div>
    </div>
  );
};

export default Navbar;
