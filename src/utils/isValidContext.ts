const hasType = (object: any) => Boolean(object?.$$typeof);
const hasTypeAndContext = (object: any) => hasType(object) && Boolean(object._context);

const isValidContext = (context: any) => {
  return (hasType(context) && hasTypeAndContext(context?.Provider)) || hasTypeAndContext(context?.Consumer);
};

export default isValidContext;
