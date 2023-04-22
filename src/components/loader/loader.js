import css from './loader.module.css';

const Loader = () => {
  return (
    <div className={ css.spinner }>
      <div className={ css.loadingioSpinner }>
        <div className={ css.ldio }>
          <div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
