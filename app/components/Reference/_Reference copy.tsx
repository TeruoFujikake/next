const Reference = ({ fontSize, text, href, target, onClickHandler, isDisabled }) => {
  return (
    <a
      href={href}
      target={target}
      onClick={onClickHandler}
      style={{ fontSize: `${fontSize}px`, pointerEvents: isDisabled ? 'none' : 'auto' }}
    >
      てすと
    </a>
  );
};

export default Reference;