export default function(){
  this.transition(
    this.fromRoute('order'),
    this.toRoute('pending'),
    this.use('toLeft', { duration: 500, }),
    this.reverse('toRight', { duration: 500, })
  );
};
