import { getGlobalData } from '../utils/global-data';

export default function Footer({ name }) {
  return (
    <footer style={{width:"100%"}} className="py-16 flex flex-col items-center">
      <div className="dark:text-white mt-8 mb-3 font-bold opacity-60">
        <div>{name}</div>
        <div>All Rights Reserver</div>
      </div>
    </footer>
  );
}
